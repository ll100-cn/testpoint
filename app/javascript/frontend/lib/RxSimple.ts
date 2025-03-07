// SNIP: 4d42436ba7cc1fb8a3500e3b65f791af
import { Observable, ReplaySubject, Subscription, type Observer, type OperatorFunction, type Subscribable, type Unsubscribable } from "rxjs"

export class RxInterruptedError extends Error {
  constructor() {
    super('Subscription interrupted before any value or error was emitted')
  }
}

export class RxSingle<T> implements Observer<T> {
  subject = new ReplaySubject<T>(1)
  isEmitted = false

  next(value: T) {
    if (this.isEmitted) {
      return
    }

    this.isEmitted = true
    this.subject.next(value)
  }

  error(err: any) {
    if (this.isEmitted) {
      return
    }

    this.isEmitted = true
    this.subject.error(err)
  }

  complete() {
  }

  asObservable(): Observable<T> {
    return this.subject.asObservable()
  }
}

export class RxSimple<T> implements Subscribable<T> {
  single!: RxSingle<T>
  observable!: Observable<T>

  constructor() {
    this.single = new RxSingle<T>()
    this.observable = this.single.asObservable()
  }

  next(value: T) {
    this.single.next(value)
  }

  error(err: any) {
    this.single.error(err)
  }

  complete() {
    this.single.complete()
  }

  subscribe(observer: Partial<Observer<T>>): Unsubscribable {
    const subscription = this.observable.subscribe(observer)

    return new Subscription(() => {
      if (!this.single.isEmitted) {
        observer.error?.(new RxInterruptedError())
      }

      subscription.unsubscribe()
    })
  }

  pipe(): Observable<T>
  pipe<A>(op1: OperatorFunction<T, A>): Observable<A>
  pipe<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): Observable<B>
  pipe<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): Observable<C>
  pipe<A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): Observable<D>
  pipe<A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): Observable<E>
  pipe<A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): Observable<F>
  pipe<A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): Observable<G>
  pipe<A, B, C, D, E, F, G, H>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): Observable<H>
  pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): Observable<I>
  pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]): Observable<unknown>
  pipe(...operations: OperatorFunction<any, any>[]): Observable<any> {
    const piped = this.observable.pipe.apply(this.observable, operations as any)

    const proxy = new RxSimple()
    proxy.single = this.single as any
    proxy.observable = piped
    return proxy as any
  }
}
