function fctAddDigit(digit){
  //read string
  let tmp = document.getElementById('Operation').innerHTML;
     
  //check new operation
  if((digit == ' + ') || (digit == ' - ') || (digit == ' x ') || (digit == ' / ')){
    //delete ',' at the end of a number -> 33, -> 33
    if(tmp.endsWith(',')){
      tmp = tmp.slice(0, -1);
    }
    //double operator like + -    
    if(tmp.endsWith(' ')){
      tmp = tmp.slice(0, -3);
    }
    //change button AC => C
    document.getElementById('Delete').innerHTML = 'C';
  }

  //check double ','
  let i = tmp.lastIndexOf(' ');   
  if(digit == ','){
    if(i == -1){
      let k = tmp.lastIndexOf(',');   
      if(k != -1){
        digit = '';
      }
    }
    else if(i != -1){
      doubleComma = tmp.slice(i);  
      k = doubleComma.lastIndexOf(',');   
      if(k != -1){
        digit = '';
      }
    }
  }

  //check first digit != '0' after second input (when it is not a ´,') -> 06 -> 6
  let l = tmp.length;
  if((tmp.endsWith('0')) && ((tmp.charAt(l-2) == ' ') || (tmp.startsWith('0'))) && (digit != ',')){
    tmp = tmp.slice(0, -1);
  }

  //check 0 in front of ','
  i = tmp.lastIndexOf(' ');   
  if((tmp.endsWith(' ')) && (digit == ',')){
    tmp = tmp.substring(0, i+1) + '0' + tmp.substring(i+1);
  }
  
  //check first digits == '00'
  l = tmp.length;
  if((tmp.endsWith('0')) && (tmp.charAt(l-2) == '0') && (tmp.charAt(l-3) == ' ')){
    tmp = tmp.slice(0, l-2);
  }

  //show string
  tmp = tmp + digit;
  document.getElementById('Operation').innerHTML = tmp;

}

function fctDeleteLastElement(){
  //read string
  let tmp = document.getElementById('Operation').innerHTML;

  //when the character ' ' is in the string, then you have to delete only the last element of the string
  let i = tmp.lastIndexOf(' '); 
  let l = tmp.length;
  if(i == -1){                                            //-1 => no ' ' is in the string
    document.getElementById('Operation').innerHTML = '';
    document.getElementById('Result').innerHTML = '';
    document.getElementById('Delete').innerHTML = 'AC';
  }
  else if(i >= 0){
    if(tmp.charAt(l-1) == ' '){
      tmp = tmp.slice(0, -3);
    }
    else{
      tmp = tmp.slice(0, i+1);
    }
    document.getElementById('Operation').innerHTML = tmp;
  }
}

function fctBackSpace(){
  //read string
  let tmp = document.getElementById('Operation').innerHTML;
  let i = tmp.length;
  if(tmp.charAt(i-1) == ' '){
    tmp = tmp.slice(0, i-3);  
  }
  else{
    tmp = tmp.slice(0, i-1);
  }
  document.getElementById('Operation').innerHTML = tmp;
  if(tmp == ''){
    document.getElementById('Delete').innerHTML = 'AC';
  }
}

function fctPlusMinus(){
  //read string
  let tmp = document.getElementById('Operation').innerHTML;

  //insert a '-' in front of the last value
  let i = tmp.lastIndexOf(' ');         
  //first digit
  if(i == -1){                                            //-1 => no ' ' is in the string
    if(tmp.charAt(0) == '-'){
      document.getElementById('Operation').innerHTML = tmp.slice(1);
    }
    else{
      document.getElementById('Operation').innerHTML = '-' + document.getElementById('Operation').innerHTML;
    }
  }
  //other digits
  else if(i >= 0){
    if(tmp.charAt(i + 1) == '-'){
      let tmp1 = tmp.slice(0, i + 1);
      let tmp2 = tmp.slice(i + 2);
      document.getElementById('Operation').innerHTML = tmp1 + + tmp2;
    }
    else{
      let tmp1 = tmp.slice(0, i);
      let tmp2 = tmp.slice(i + 1);
      document.getElementById('Operation').innerHTML = tmp1 + ' -' + tmp2;
      }
  }
}

function fctCalculation(){
  //read string
  let tmp = document.getElementById('Operation').innerHTML;

  //vibrate
  navigator.vibrate(1000);
  
  //replace characters
  tmp = tmp.replaceAll(',', '.');
  tmp = tmp.replaceAll('x', '*');

  //solve
  tmp = eval(tmp);  //TypeOf(tmp) frpm string => number!

  //change format to german format
  tmp = new Intl.NumberFormat('de-DE').format(tmp,);
  
  //show string
  document.getElementById('Result').innerHTML = tmp;
}