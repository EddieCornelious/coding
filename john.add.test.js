
const test = function(){
  const results = [];
  const tests = [{i1: 1, i2: 3, o:4}, {i1: 12, i2: 3, o:15}];
  for(let i=0; i<tests.length; i++){
    const i1 = tests[i].i1;
    const i2 = tests[i].i2;
    const expected = tests[i].o;
    const actual = add(i1, i2);
    if(actual === expected){
      results.push({o:"passed", expected, actual: actual || "no value returned"});
    } else{
      results.push({o:"failed", expected, actual: actual || "no value returned" });
    }
  }
  return results;
}


stringify(test());


