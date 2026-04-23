# Release Changes: v2.6.0 → v2.7.2

**Rollout branch:** `testnet-rollout-2.7.2`
**Base branch:** `testnet`
**Upstream commits merged:** 83

---

## New ENV Variables

| Variable | Type | Description | Default | Required | Version |
|---|---|---|---|---|---|
| `NEXT_PUBLIC_API_KEYS_ALERT_MESSAGE` | `string` | Custom alert HTML/text on the API keys page | - | Optional | v2.7.0+ |
| `NEXT_PUBLIC_API_DOCS_ALERT_MESSAGE` | `string` | Custom alert HTML/text on the API docs page | - | Optional | v2.7.0+ |
| `NEXT_PUBLIC_ACCOUNT_AUTH_PROVIDER` | `auth0 \| dynamic` | Auth provider for user authentication | `auth0` | Optional | v2.7.0+ |
| `NEXT_PUBLIC_ACCOUNT_DYNAMIC_ENVIRONMENT_ID` | `string` | Dynamic project Environment ID | - | Required if provider is `dynamic` | v2.7.0+ |
| `NEXT_PUBLIC_ACCOUNT_API_KEYS_BUTTON` | `boolean \| string` | Enable/disable "Add API key" button or provide URL to make it a link | `true` | Optional | v2.7.0+ |
| `NEXT_PUBLIC_ROLLUP_LAYER_NUMBER` | `number` | Layer number of the rollup | `2` | Optional | v2.7.0+ |
| `NEXT_PUBLIC_NAME_SERVICE_PROTOCOLS` | `Array<string>` | List of name service protocol IDs used by the chain | `['ens']` | Optional | v2.7.0+ |
| `NEXT_PUBLIC_CROSS_CHAIN_TXS_ENABLED` | `boolean` | Enables cross-chain transaction tracking feature | - | Required to enable feature | v2.7.0+ |
| `NEXT_PUBLIC_INTERCHAIN_INDEXER_API_HOST` | `string` | Interchain indexer API service host for cross-chain tx data | - | Required if cross-chain enabled | v2.7.0+ |

---

## Deprecated ENV Variables

| Variable | Replacement | Deprecated in |
|---|---|---|
| `NEXT_PUBLIC_SAVE_ON_GAS_ENABLED` | None (feature removed) | v2.7.0 |
| `NEXT_PUBLIC_API_SPEC_URL` | Auto-constructed from API config | v2.7.0 |
| `NEXT_PUBLIC_ROLLUP_L1_BASE_URL` | `NEXT_PUBLIC_ROLLUP_PARENT_CHAIN` | v2.7.0 |

> **Note:** `NEXT_PUBLIC_ROLLUP_PARENT_CHAIN` is now **Required** (was optional in v1.38.0+). The `baseUrl` field within it is required. This is a breaking change for rollup chains.

---

## Breaking Changes

1. **`NEXT_PUBLIC_ROLLUP_PARENT_CHAIN` is now Required** — previously optional, now the primary parent chain config. If the fork uses `NEXT_PUBLIC_ROLLUP_L1_BASE_URL`, it must be migrated to `NEXT_PUBLIC_ROLLUP_PARENT_CHAIN.baseUrl`.
2. **ReCaptcha gating changed** — `NEXT_PUBLIC_RE_CAPTCHA_APP_SITE_KEY` is now only required when `NEXT_PUBLIC_ACCOUNT_AUTH_PROVIDER=auth0` (the default). No change needed unless switching providers.
3. **OP Superchain feature replaced by generic Multichain explorer** — `NEXT_PUBLIC_ROLLUP_TYPE=optimistic` Superchain-specific config may need to be re-evaluated.
4. **Transaction success status removed from tx lists** — visual/behavioral change; success badge no longer shown in transaction lists.
5. **Time format migrated to 24-hour** — all time displays across the UI now use 24-hour format.
6. **`NEXT_PUBLIC_VIEWS_CONTRACT_LANGUAGE_FILTERS`** — deprecated in v2.6.0, now configured via API. Remove from `.env` if set.
7. **`NEXT_PUBLIC_API_SPEC_URL`** — deprecated, URL now auto-constructed. Safe to remove.

---

## Build Changes

| Change | Detail |
|---|---|
| **Node memory** | `NODE_OPTIONS` raised from `--max-old-space-size=4096` to `--max-old-space-size=8192` — update CI/CD build env if memory is constrained |
| **next** | `15.5.9` → `15.5.10` |
| **@chakra-ui/react** | `3.15.0` → `3.33.0` (major minor bump — theme tokens changed) |
| **@chakra-ui/cli** | `3.30.0` → `3.33.0` |
| **@blockscout/multichain-aggregator-types** | `1.6.3-alpha.3` → `2.1.2` |
| **@blockscout/tac-operation-lifecycle-types** | `0.0.1-alpha.6` → `1.1.0` |
| **@blockscout/interchain-indexer-types** | _(new)_ `0.0.10` |
| **@dynamic-labs/ethereum** | _(new)_ `4.74.1` — Dynamic auth provider SDK |
| **@dynamic-labs/sdk-react-core** | _(new)_ `4.74.1` |
| **@dynamic-labs/wagmi-connector** | _(new)_ `4.74.1` |
| **d3-sankey** | _(new)_ `^0.12.3` — Sankey diagram support |
| **cspell** | _(new)_ `9.6.4` — spell checking in CI |
| **license-report / license-report-check** | _(new)_ dev deps for license CI check |
| **eslint-plugin-no-cyrillic-string** | _(removed)_ |

---

## New Services / Features

- **Cross-chain transaction tracking** — new `NEXT_PUBLIC_INTERCHAIN_INDEXER_API_HOST` service dependency
- **Dynamic auth provider** — alternative to Auth0, requires `@dynamic-labs/*` SDK packages and `NEXT_PUBLIC_ACCOUNT_DYNAMIC_ENVIRONMENT_ID`
- **Sankey diagrams** — new d3-sankey visualization on transaction pages
- **Smart wallet auth** — new authentication flow
- **ERC-7984 Confidential Tokens** — new token type support
- **FHE operations and tags** — Fully Homomorphic Encryption op tracking
- **Name service protocol list** — `NEXT_PUBLIC_NAME_SERVICE_PROTOCOLS` replaces chain-ID-based protocol resolution

---

## Action Items

- [ ] **Check rollup config**: If `NEXT_PUBLIC_ROLLUP_L1_BASE_URL` is set in `.env`, migrate to `NEXT_PUBLIC_ROLLUP_PARENT_CHAIN={"baseUrl":"<value>"}` and remove old var
- [ ] **Update Dockerfile / CI memory**: Build now requires `NODE_OPTIONS=--max-old-space-size=8192`
- [ ] **Remove deprecated vars from .env**: `NEXT_PUBLIC_SAVE_ON_GAS_ENABLED`, `NEXT_PUBLIC_API_SPEC_URL`, `NEXT_PUBLIC_ROLLUP_L1_BASE_URL`
- [ ] **Auth0 still default**: No action needed for auth unless switching to Dynamic — if Dynamic is desired, set `NEXT_PUBLIC_ACCOUNT_AUTH_PROVIDER=dynamic` and provide `NEXT_PUBLIC_ACCOUNT_DYNAMIC_ENVIRONMENT_ID`
- [ ] **Verify Chakra UI v3.33.0 theming**: Custom theme overrides in `NEXT_PUBLIC_COLOR_THEME_OVERRIDES` may need token name updates
- [ ] **Cross-chain feature**: Opt-in only — no action needed unless the feature is wanted; set `NEXT_PUBLIC_CROSS_CHAIN_TXS_ENABLED=true` + `NEXT_PUBLIC_INTERCHAIN_INDEXER_API_HOST` to enable
- [ ] **Name service**: If `NEXT_PUBLIC_NAME_SERVICE_API_HOST` is set, optionally add `NEXT_PUBLIC_NAME_SERVICE_PROTOCOLS` to specify protocols (defaults to `['ens']`)
- [ ] **Verify Vana fork patches apply cleanly** after merge (Monaco editor, CSP, contract interactions, public tags)
