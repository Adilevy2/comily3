const bcrypt=require('bcrypt');

async function generate(){

    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash('12345',salt);
    const comp=await bcrypt.compare(loginPassword,hash);
    
  }
  generate();   