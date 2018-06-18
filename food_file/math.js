//------------------------------------------------
var k1_PO_PP = 0.0,
    k2_PC_PP = 0.0,
	k3_PE_PP = 0.0,
	k4_AC_AE = 0.0,
	k5_AO_AE = 0.0,
	k6_AP_AE = 0.0;
//------------------------------------------------
//Растительная пища         Б,   Ж,     У,     Э
var breakfast_1_plant  = [];//Завтрак 1
var breakfast_2_plant  = [];//Завтрак 2
var lunch_plant        = [];//Обед
var afternoon_plant    = [];//Полдник
var dinner_plant       = [];//Ужин
//Животная пища
var breakfast_1_animal = [];//Завтрак 1
var breakfast_2_animal = [];//Завтрак 2
var lunch_animal       = [];//Обед
var afternoon_animal   = [];//Полдник
var dinner_animal      = [];//Ужин
//------------------------------------------------
function SetMeans () {
  var m = 0.0;
  for(var i=0;i<plants.length;i++){
    m        += plants[i][1];
	k1_PO_PP += plants[i][2];
	k2_PC_PP += plants[i][3];
	k3_PE_PP += plants[i][4];
  }
  m /= plants.length;
  k1_PO_PP /= plants.length;
  k1_PO_PP /= m;
  k2_PC_PP /= plants.length;
  k2_PC_PP /= m;
  k3_PE_PP /= plants.length;
  k3_PE_PP /= m;
  m = 0.0;
  for(var i=0;i<animals.length;i++){
    m        += animals[i][4];
	k4_AC_AE += animals[i][3];
	k5_AO_AE += animals[i][2];
	k6_AP_AE += animals[i][1];
  }
  m /= animals.length;
  k4_AC_AE /= animals.length;
  k4_AC_AE /= m;
  k5_AO_AE /= animals.length;
  k5_AO_AE /= m;
  k6_AP_AE /= animals.length;
  k6_AP_AE /= m;
}
//------------------------------------------------
function SetNeeds(energy){
  var full_protein = energy * 0.12 / 4.1;
  var K7 = (energy*k6_AP_AE - full_protein)/(full_protein*(k3_PE_PP*k6_AP_AE - 1.0));
  var K8              = 1.0 - K7;
  var plant_protein   = full_protein * K7;
  var plant_oil       = plant_protein * k1_PO_PP,
      plant_carboh    = plant_protein * k2_PC_PP,
	  plant_energy    = plant_protein * k3_PE_PP;
  var animal_energy   = energy - plant_energy;
  var animal_carboh   = animal_energy * k4_AC_AE,
      animal_oil      = animal_energy * k5_AO_AE,
	  animal_protein  = animal_energy * k6_AP_AE;
  var mb1 = 0.25, mb2 = 0.15, mlu = 0.35, maf = 0.15, mdi = 0.1;
  breakfast_1_plant[0]  = plant_protein  * mb1;//Завтрак 1
  breakfast_1_plant[1]  = plant_oil      * mb1;
  breakfast_1_plant[2]  = plant_carboh   * mb1;
  breakfast_1_plant[3]  = plant_energy   * mb1;
  
  breakfast_2_plant[0]  = plant_protein  * mb2;//Завтрак 2
  breakfast_2_plant[1]  = plant_oil      * mb2;
  breakfast_2_plant[2]  = plant_carboh   * mb2;
  breakfast_2_plant[3]  = plant_energy   * mb2;
  
  lunch_plant[0]        = plant_protein  * mlu;//Обед
  lunch_plant[1]        = plant_oil      * mlu;
  lunch_plant[2]        = plant_carboh   * mlu;
  lunch_plant[3]        = plant_energy   * mlu;
  
  afternoon_plant[0]    = plant_protein  * maf;//Полдник
  afternoon_plant[1]    = plant_oil      * maf;
  afternoon_plant[2]    = plant_carboh   * maf;
  afternoon_plant[3]    = plant_energy   * maf;
  
  dinner_plant[0]       = plant_protein  * mdi;//Ужин
  dinner_plant[1]       = plant_oil      * mdi;
  dinner_plant[2]       = plant_carboh   * mdi;
  dinner_plant[3]       = plant_energy   * mdi;

  breakfast_1_animal[0] = animal_protein * mb1;//Завтрак 1
  breakfast_1_animal[1] = animal_oil     * mb1;
  breakfast_1_animal[2] = animal_carboh  * mb1;
  breakfast_1_animal[3] = animal_energy  * mb1;
  
  breakfast_2_animal[0] = animal_protein * mb2;//Завтрак 2
  breakfast_2_animal[1] = animal_oil     * mb2;
  breakfast_2_animal[2] = animal_carboh  * mb2;
  breakfast_2_animal[3] = animal_energy  * mb2;
  
  lunch_animal[0]       = animal_protein * mlu;//Обед
  lunch_animal[1]       = animal_oil     * mlu;
  lunch_animal[2]       = animal_carboh  * mlu;
  lunch_animal[3]       = animal_energy  * mlu;
  
  afternoon_animal[0]   = animal_protein * maf;//Полдник
  afternoon_animal[1]   = animal_oil     * maf;
  afternoon_animal[2]   = animal_carboh  * maf;
  afternoon_animal[3]   = animal_energy  * maf;
  
  dinner_animal[0]      = animal_protein * mdi;//Ужин
  dinner_animal[1]      = animal_oil     * mdi;
  dinner_animal[2]      = animal_carboh  * mdi;
  dinner_animal[3]      = animal_energy  * mdi;
}
//------------------------------------------------
// Метод Гаусса: с выбором главного элемента по столбцу
function SLAEgaussB (size) {
  this.N    = size;
  this.a    = 0;
  this.m    = 0.0;
  this.s    = 0.0;
  this.zero = 0.000000001;
  this.R    = new Array(size);
}

SLAEgaussB.prototype.Solve = function (A,X,B) {
  var i, j, k;
/* Initialize the pointer vector */
  for (i=0;i<this.N;i++) this.R[i] = i;
  //приведение к верхне-треугольному виду
  for (i=0;i<this.N-1;i++){
    //ищем ведущий элемент  
    for (j=i+1;j<this.N;j++){
      if (Math.abs(A[this.R[j]][i]) > Math.abs(A[this.R[i]][i]) ){
        //обмен индексов for the p-1-й ведущей строке если необходимо
        this.a    = this.R[i];
        this.R[i] = this.R[j];
        this.R[j] = this.a;
      }
    }//конец обмена индексов
	this.m = A[this.R[i]][i];
	for(j=i+1;j<this.N;j++){//цикл по строкам
	  this.s = A[this.R[j]][i];
	  for(k=i;k<this.N;k++)//цикл по столбцам
	    A[this.R[j]][k] = A[this.R[i]][k]*this.s - A[this.R[j]][k]*this.m;
	  B[this.R[j]] = B[this.R[i]]*this.s - B[this.R[j]]*this.m;
	}
  }//конец приведения к верхне-треугольному виду
  //обратная подстановка
  for (i=this.N-1;i>=0;i--){
    this.s = 0.0;
    for (j=i+1;j<this.N;j++)
      this.s += A[this.R[i]][j] * X[j];
	if(A[this.R[i]][i] == 0.0) return 1;
    X[i] = ( B[this.R[i]] - this.s) / A[this.R[i]][i];
  }//конец обратной подстановки
  return 0;
}
//------------------------------------------------
function next_combination (a,k,n) {
  for (var i=k-1; i>=0; --i)
    if (a[i] < n-k+i+1) {
      ++a[i];
	  for (var j=i+1; j<k; ++j)
	    a[j] = a[j-1]+1;
	  return true;
    }
  return false;
}
//------------------------------------------------
function CalcMenu(vec,tbl){
  var N   = 4,
      txt = '';
	  max = 200.0,
	  n   = 1;
  var B   = new Array(N),
      X   = new Array(N),
      A   = new Array(N),
      M   = new Array(N),
	  G   = new SLAEgaussB(N),
	  K   = tbl.length-1;
  for(var i=0;i<N;i++){
    A[i] = new Array(N);
	M[i] = i;
  }
  do {
    var ok = true;
    for(var i=0;i<N;i++){
	  B[i] = vec[i];
	  for(var j=0;j<N;j++)
	    A[i][j] = tbl[M[j]][i+1]/100.0;//A[строка БЖУЭ][столбец ПП]
    }
	if(!G.Solve(A,X,B)){
	  for(var i=0;i<N;i++)
	    if(X[i] < 0.0 || X[i] > max)
		  ok = false;
	  if(ok){
	    txt += '-------- Вариант ' + n + ' --------\n';
	    for(var i=0;i<N;i++)
		  txt += tbl[M[i]][0] + ' : ' + (X[i]).toFixed(0) + ' г.\n';
		//txt += '--------------------------\n';
		n++;
	  }
	}
  } while (next_combination(M,N,K));
  return txt;
}
//------------------------------------------------