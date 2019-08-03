import { FirebaseStoreDatePipe } from './firebase-store-date.pipe';

describe('FirebaseStoreDatePipe', () => {
  it('create an instance', () => {
    const pipe = new FirebaseStoreDatePipe();
    expect(pipe).toBeTruthy();
  });
});
