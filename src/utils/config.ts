export default {
  local: {
    BASE_API: 'http://127.0.0.1:4444',
    alioss_bucket: 'xxx-dev',
  },
  dev: {
    BASE_API: 'http://127.0.0.1:4444',
    alioss_bucket: 'xxx-dev',
  },
  test: {
    BASE_API: 'http://127.0.0.1:4444',
    alioss_bucket: 'xxx-test',
  },
  prod: {
    BASE_API: 'http://127.0.0.1:4444',
    alioss_bucket: 'xxx-prod',
  },
}[VITE_MODE];
