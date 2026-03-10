/// <reference types="vite/client" />

declare module 'typewriter-effect' {
  import { Component } from 'react';
  interface TypewriterOptions {
    strings?: string[];
    autoStart?: boolean;
    loop?: boolean;
    delay?: number;
    deleteSpeed?: number;
    cursor?: string;
    wrapperClassName?: string;
    cursorClassName?: string;
  }
  interface TypewriterProps {
    options?: TypewriterOptions;
    onInit?: (typewriter: TypewriterInstance) => void;
  }
  interface TypewriterInstance {
    typeString(str: string): TypewriterInstance;
    deleteAll(speed?: number): TypewriterInstance;
    deleteChars(amount: number): TypewriterInstance;
    pauseFor(ms: number): TypewriterInstance;
    start(): TypewriterInstance;
    stop(): TypewriterInstance;
    callFunction(cb: () => void): TypewriterInstance;
    changeDelay(delay: number): TypewriterInstance;
    changeDeleteSpeed(speed: number): TypewriterInstance;
  }
  export default class Typewriter extends Component<TypewriterProps> {}
}
