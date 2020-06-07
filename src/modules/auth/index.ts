/**
 * Barrel File used to export various classes and files from the app, so imports are less redundant
 */

/**
 * AUTH MODULE
 */
export * from '@modules/auth/auth.module';
export * from '@modules/auth/auth.controller';
export * from '@modules/auth/auth.service';
export * from '@modules/auth/strategies/jwt.strategy';
export * from '@modules/auth/strategies/local.strategy';
export * from '@modules/auth/guards/jwt-auth.guard';
export * from '@modules/auth/guards/local-auth.guard';
