# auth-helper

Small Authorization helper library. Please note that this is **not** a full and
highly secure authorization solution but rather some small helper functions to
provide a simple way to handle simple Authorization and register + login logic.

## Helper functions

The following helper functions are available to help you with generating
password hashes, a random hex string for access tokens and verifying a clear
text password against a hashed password.

- **arrayBufferToHexString**: Converts a given ArrayBuffer to a HEX string.
- **async createPasswordHash**: Creates a SHA-256 hash for given
  password/string.
- **generateAccessTokenHash**: Creates an access token hash (hex string) from a
  Random 24 elements UInt8 Array.
- **async verifyPassword**: Verifies that a given clear text password and a
  hashed password match.

## Usage and Versioning

The module uses semantic versioning and Github tags to create a new version. It
can be imported into a Deno project by adding the tag before the filename or
from JSR.

Example:

```typescript
import {
   createPasswordHash,
} from 'https://raw.githubusercontent.com/sgohlke/auth-helper/1.0.0/index.ts'
```

Example using JSR:

```typescript
import { createPasswordHash } from 'jsr:@sgohlke/auth-helper'
```

## Code example

The following code example shows how this library can be used.

```typescript
import {
   createPasswordHash,
   generateAccessTokenHash,
   verifyPassword,
} from 'https://raw.githubusercontent.com/sgohlke/auth-helper/1.0.0/index.ts'

async function examples(): Promise<void> {
   // Example 1: User registers new account and provides password to be used for  logins
   const passwordProvidedByUser = 'A secret password!'
   // You do not want to store a clear text password in a database, better store a password hash.
   const hashedPassword = await createPasswordHash(passwordProvidedByUser)
   // Do something, e.g. store hashed password in database

   // Example 2: Generate an access token for the user, e.g. to be used in a response header/JWT
   console.log('Generate access token for user', generateAccessTokenHash())

   // Example 3: The user tries to log in.
   const passwordFromUserInput = 'A wrong password!'
   const hashedPWFromDB = '123456789ABCDEF...'
   // You want to check if the password from the login matches with the hashed password in the database.
   console.log(
      'Is password correct?',
      await verifyPassword(passwordFromUserInput, hashedPWFromDB),
   )
}
```
