<?php

  $n=7;
   
  for($i=0;$i<$n;$i++)
  {
      for($j=0;$j<$n;$j++)
	  {
	      $a[$i][$j]=0;
	  }
  }
  $center=($n-1)/2; 
  $i=$center;$j=$center;
  $count=1;

  if($n%4==3)
  {
     $time=($n-3)/2;
	 a[$i+1][$j]='*';
	 a[$i-1][$j]='*';
	 a[$i][$j+1]='*';
	 a[$i][$j-1]='*';
     for($time-=1;$time>0;$time--)
	  {
	     a[$i+2*$count][$j]='*';
	     a[$i-2*$count][$j]='*';
	     a[$i][$j+2*$count]='*';
		 a[$i][$j-2*$count]='*'; 
         $count++;
	  }	   
  }

  else if($n%4==1)
  {
     $time=($n-1)/2;
	 $a[$i][$j]='*';
	 for($time-=1;$time>0;$time--)
	  {
	     $a[$i+2*$count][$j]='*';
	     $a[$i-2*$count][$j]='*';
	     $a[$i][$j+2*$count]='*';
		 $a[$i][$j-2*$count]='*'; 
		 $count++;
	  }
	  
  }
  
  for($i=0;$i<$n;$i++)
  {
      for($j=0;$j<$n;$j++)
	  {
	      echo $a[$i][$j];
	  }
	  echo'<br>';
  }
  
?>