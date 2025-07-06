#### Mongoose Learning 
- User.create().populate()
-  You cannot use .populate() immediately after .create() — because .create() does not return a Mongoose document instance with .populate() methods directly.
-  [] -> not falsy always use ==> .length property ==> Ex User.find({})
- support any Schema ---> use Way1 : use mongoose.Schema.Types.Mixed => no need for ref  
    - Check changes are not detected 
    - here we need to set manually call
    - instance.markModified('pathforProperty');
-  use mongoose.Schema.Types.ObjectId
// ref no set --> here we can but changes will not be tracked .....


#### normal JS 
-     async function getData() {
    const response = await fetch('https://api.example.com');
    const data = await response.json();
    <!-- no need to write promise here  -->
    return data;
    }
- Learning is that , it by defaults wraps data and returns new Promise() ,



### Bcrypt 
- Encrypting it 
    - Automatically generates a random salt 
    - Uses it to hash the password 
    - Embeds the salt inside the final hash string

```
const hash = await bcrypt.hash(password, 10);
```

- Decrypting it 
    -- It extracts the salt from storedHash
    -- Re-hashes plainPassword using that salt
    -- Compares the result with storedHash

```
const isMatch = await bcrypt.compare(plainPassword, storedHash);
```


### Schema.Types.ObjectId v/s Types.ObjectId
- mongoose.Schema.Types.ObjectId
    -- For defining schema fields
    -- type: mongoose.Schema.Types.ObjectId
- mongoose.Types.ObjectId
    -- For creating/handling values
    -- new mongoose.Types.ObjectId()


### JWT vs Cookie Expiration if no expiresIn(for JWT in xd => 30d => 30days) and (maxAge or expires ==> new Date())
- JWT will not contain an exp (expiry) field
- valid indefinitely
- Cookie becomes a session cookie 
- When Browser tab is closed it get's cleared 

### JWT