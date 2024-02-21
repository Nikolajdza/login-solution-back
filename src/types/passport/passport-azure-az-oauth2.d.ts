declare module 'passport-azure-ad-oauth2' {
  import passport from 'passport';

  interface StrategyOption {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
  }

  interface StrategyOptionWithRequest extends StrategyOption {
    passReqToCallback: true;
  }

  class Strategy implements passport.Strategy {
    constructor(options: StrategyOption, verify: (accessToken: any, refreshToken: any, profile: any, done: (error: any, user?: any, info?: any) => void) => void);
    constructor(options: StrategyOptionWithRequest, verify: (req: any, accessToken: any, refreshToken: any, profile: any, done: (error: any, user?: any, info?: any) => void) => void);

    name: string;

    authenticate(req: any, options?: any): void;
  }

  namespace Strategy {
    export type StrategyOptions = StrategyOption;
    export type StrategyOptionsWithRequest = StrategyOptionWithRequest;
  }
  export = Strategy;
}