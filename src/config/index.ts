/**
 * Setup the config object to be imported by the ConfigService in app.module.ts
 *
 * This object is built as a combination of other smaller config objects grouped by functionality
 */

import AppConfigObject from './app';
import DatabaseConfigObject from './database';
import AuthConfigObject from './auth';

export default [AppConfigObject, DatabaseConfigObject, AuthConfigObject];
