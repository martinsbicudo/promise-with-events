export interface IWatchCustomEvent {
  (eventName: string, prefix: string): Promise<any>;
}
