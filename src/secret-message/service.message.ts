import { computed, Injectable, signal } from '@angular/core';
import { CipherKey, CipherService } from '../cipher/service.cipher';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  superSecretMessage = signal(
    'Angular Signals are in developer preview in v16 today!'
  );

  secretCode = computed(() =>
    this.translateSecretMessage(
      this.superSecretMessage(),
      this.cipher.secretCipher()
    )
  );
  solvedMessage = computed(() =>
    this.translateSecretMessage(this.secretCode(), this.cipher.uncodedCipher())
  );

  constructor(private cipher: CipherService) {}

  translateSecretMessage(code: string, ciph: CipherKey[]): string {
    let encoded = '';

    code.split('').forEach((char) => {
      let isUpperCase = false;
      if (char == char.toUpperCase()) {
        isUpperCase = true;
      }

      let value = ciph.find((el) => el.key === char.toLowerCase())?.value;
      let newChar = value ? value : char;

      encoded += isUpperCase ? newChar.toUpperCase() : newChar;
    });
    return encoded;
  }
}
