function to(promiss,errorExt){
    return promiss.then(function(data){
            return [null,data]; 
        }).catch(function(err){
            if(errorExt){
                Object.assign(err,errorExt);
            }
            return [err,null];
        });
}

export default to;