import { configuration } from './configuration';

export type Config = typeof configuration;
export type AppConfig = typeof configuration.app;
export type DbConfig = typeof configuration.db;