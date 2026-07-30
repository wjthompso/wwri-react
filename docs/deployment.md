# Deployment — production and preview

Two copies of the site run on this server. Both are static builds of the same repo, served by
`npx serve` behind nginx. Nothing is containerized and there is no CI: a deploy is "build, then
restart the service."

| Environment | URL | Build output | systemd service | Port |
|-------------|-----|--------------|-----------------|------|
| Production  | https://wildfireindex.org | `dist/` | `wwri-frontend` | 3000 |
| Preview     | https://preview.wildfireindex.org | `dist-preview/` | `wwri-preview` | 3001 |

Both hosts share the `wildfireindex.org` Let's Encrypt certificate and proxy `/censustracts`,
`/api`, and `/data/` to the same tileserver (8080) and API (8081), so the dashboard behaves
identically on preview.

nginx config: `/etc/nginx/sites-available/default` (symlinked into `sites-enabled/`). Timestamped
backups of that file sit beside it as `default.bak-<YYYYMMDDHHMMSS>`.

---

## Refresh the preview site

Use this to let the team review a change before it goes live.

```bash
cd ~/wwri-react
npx vite build --outDir dist-preview
sudo systemctl restart wwri-preview
```

`npx serve` reads from disk per request, so the restart is only needed if the service is down —
but restarting is harmless and makes the deploy unambiguous.

## Promote to production

Back up the current bundle first so a bad deploy can be rolled back by renaming a directory.
Backups live in `~/deploy-backups/`, one level above the repo. They sit outside the repo on
purpose: the `openclaw` agent account has no write access there, so an automated deploy cannot
destroy the rollback history it might need.

```bash
cd ~/wwri-react
cp -r dist ~/deploy-backups/dist.pre-<short-change-name>-deploy-$(date +%Y%m%d%H%M%S)
npm run build                      # runs tsc, then vite build into dist/
sudo systemctl restart wwri-frontend
curl -s -o /dev/null -w '%{http_code}\n' https://wildfireindex.org/
```

## Roll back production

```bash
cd ~/wwri-react
mv dist ~/deploy-backups/dist.broken-$(date +%Y%m%d%H%M%S)
cp -r ~/deploy-backups/dist.pre-<the-backup-you-want> dist
sudo systemctl restart wwri-frontend
```

## The `openclaw` agent account

An unprivileged Unix account named `openclaw` exists so an external agent (running on a separate
machine) can edit and deploy this site over SSH without holding a general login on this shared
server. It authenticates with an ed25519 key generated on the agent host — the private half has
never been on this server — whose fingerprint is
`SHA256:A3FuqsXSV31MzaU40uAnR/L3Ug1m3081pli+0TuMkpk`. Access is confined by POSIX ACLs rather than
group membership, because the `woverbyethompson` group comes from LDAP and has no local
`/etc/group` entry to add members to.

| Path | Agent access |
|------|--------------|
| `~/wwri-react` | read/write (ACL `u:openclaw:rwX`, inherited by new files) |
| `~` (`/home/woverbyethompson`) | traverse only — cannot list, create, or delete |
| `~/deploy-backups` | read only — cannot delete rollback snapshots |
| `~/wwri-metrics-api`, other users' homes | no access |
| `sudo`, `docker` | not a member of either group |

The agent cannot restart services, and does not need to: `npx serve` reads from disk per request,
so writing `dist/` publishes to production immediately. Because it also cannot read
`~/.ssh`, it can commit locally but cannot push to GitHub — pushes stay manual.

To inspect or change what it can reach:

```bash
getfacl ~/wwri-react                                 # current grants
sudo setfacl -R -x u:openclaw ~/wwri-react           # revoke access
sudo setfacl -R -d -x u:openclaw ~/wwri-react        # revoke inheritance too
sudo deluser --remove-home openclaw                  # remove the account entirely
```

## Troubleshooting

- **502 Bad Gateway** — the `serve` process is down or still starting. Check
  `systemctl status wwri-frontend` (or `wwri-preview`) and `journalctl -u wwri-frontend -n 50`.
- **Old content after a deploy** — the build hashes asset filenames, so a hard refresh
  (Cmd/Ctrl+Shift+R) clears a stale `index.html` from the browser cache.
- **Preview and production look identical** — you probably rebuilt `dist` instead of
  `dist-preview`. Compare the bundle hashes:
  `curl -s https://preview.wildfireindex.org/ | grep -o 'assets/index-[^"]*\.js'`
- **After editing nginx** — always `sudo nginx -t` before `sudo systemctl reload nginx`.
