// Licensed to Cloudera, Inc. under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  Cloudera, Inc. licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import huePubSub from 'utils/huePubSub';

export interface Disposable {
  dispose(): void;
}

export default class SubscriptionTracker {
  disposals: (() => void)[] = [];

  subscribe(
    subscribable: string | KnockoutSubscribable<unknown>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (...args: any[]) => any
  ): void {
    if (typeof subscribable === 'string') {
      const pubSub = huePubSub.subscribe(subscribable, callback);
      this.disposals.push(() => {
        pubSub.remove();
      });
    } else if (subscribable.subscribe) {
      const sub = subscribable.subscribe(callback);
      this.disposals.push(() => {
        sub.dispose();
      });
    }
  }

  async whenDefined<T>(observable: KnockoutSubscribable<T | undefined>): Promise<T> {
    return new Promise((resolve, reject) => {
      let disposed = false;
      const sub = observable.subscribe(val => {
        if (typeof val !== 'undefined') {
          disposed = true;
          sub.dispose();
          resolve(val);
        }
      });
      this.disposals.push(() => {
        if (!disposed) {
          sub.dispose();
          reject();
        }
      });
    });
  }

  addDisposable(disposable: Disposable): void {
    this.disposals.push(disposable.dispose.bind(disposable));
  }

  trackTimeout(timeout: number): void {
    this.disposals.push(() => {
      window.clearTimeout(timeout);
    });
  }

  addEventListener<K extends keyof HTMLElementEventMap>(
    element: HTMLElement | Document,
    type: K,
    listener: (ev: HTMLElementEventMap[K]) => unknown
  ): void {
    element.addEventListener(type, listener as EventListenerOrEventListenerObject);
    this.disposals.push(() => {
      element.removeEventListener(type, listener as EventListenerOrEventListenerObject);
    });
  }

  dispose(): void {
    while (this.disposals.length) {
      try {
        const disposeFn = this.disposals.pop();
        if (disposeFn) {
          disposeFn();
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }
}
