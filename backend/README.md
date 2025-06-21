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


# Schema.Types.ObjectId v/s Types.ObjectId
- mongoose.Schema.Types.ObjectId
    -- For defining schema fields
    -- type: mongoose.Schema.Types.ObjectId
- mongoose.Types.ObjectId
    -- For creating/handling values
    -- new mongoose.Types.ObjectId()