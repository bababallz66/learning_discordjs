import { container } from "tsyringe";

export type SessionHolder = Map<string, Session>;

export type AccountCreation = {
  job?: string;
  race?: string;
};

export type Session = {
  accountCreation?: AccountCreation;
};

export const SessionHolderSymbol = Symbol("SessionHolder");

export function createSessionHolder(): SessionHolder {
  return new Map<string, Session>();
}

export function getSessionHolder() {
  return container.resolve<SessionHolder>(SessionHolderSymbol);
}

export function getUserSession(id: string): Session {
  const sessionHolder = getSessionHolder();
  let session = sessionHolder.get(id);
  if (session) {
    return session;
  }
  
  session = {};
  sessionHolder.set(id, session);
  return session;
}
