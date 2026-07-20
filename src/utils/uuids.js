import { v7 as uuidv7 } from "uuid";

export function uuid7() {
   
    const id = uuidv7(); 
    
   
    if (typeof id !== 'string') {
        
        throw new TypeError('Generated UUIDv7 is not a valid string.');
    }
    
    return id;
}