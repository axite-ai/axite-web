declare global {
  interface Window {
    Cal?: {
      (command: string, namespace: string, config?: Record<string, any>): void;
      ns: Record<string, any>;
      q?: any[];
      loaded?: boolean;
    };
  }
}

export {};
