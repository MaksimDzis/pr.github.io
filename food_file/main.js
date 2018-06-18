//------------------------------------------------
var Form,
    Panel1,
	Panel2,
	Panel3,
    Button1,
	Button2,
	Button3,
	Button4,
	Edit1,
	Memo1,
	Memo2;
//------------------------------------------------

//------------------------------------------------

//------------------------------------------------
function Button1Click(){  
  var e = parseFloat(Edit1.Text());
  SetNeeds(e);
  Memo1.Text(CalcMenu(breakfast_1_animal,animals));
  Memo2.Text(CalcMenu(breakfast_1_plant,plants));
}
//------------------------------------------------
function Button2Click(){
  var e = parseFloat(Edit1.Text());
  SetNeeds(e);
  Memo1.Text(CalcMenu(breakfast_2_animal,animals));
  Memo2.Text(CalcMenu(breakfast_2_plant,plants));
}
//------------------------------------------------
function Button3Click(){
  var e = parseFloat(Edit1.Text());
  SetNeeds(e);
  Memo1.Text(CalcMenu(lunch_animal,animals));
  Memo2.Text(CalcMenu(lunch_plant,plants));
}
//------------------------------------------------
function Button4Click(){
  var e = parseFloat(Edit1.Text());
  SetNeeds(e);
  Memo1.Text(CalcMenu(afternoon_animal,animals));
  Memo2.Text(CalcMenu(afternoon_plant,plants));
}
//------------------------------------------------
function Button5Click(){
  var e = parseFloat(Edit1.Text());
  SetNeeds(e);
  Memo1.Text(CalcMenu(dinner_animal,animals));
  Memo2.Text(CalcMenu(dinner_plant,plants));
}
//------------------------------------------------
function Main() {
  SetMeans();
  Form      = new TForm();
  Form.Caption('Генератор меню');
  Form.Width('879px');
  Form.Height('462px');
  //---
  Edit1   = new TEdit();
  Edit1.Top('432px');
  Edit1.Left('50px');
  Edit1.Width('70px');
  Edit1.Text(2550);
  Form.AddComponent(Edit1);
  //---
  Panel1   = new TPanel();
  Panel1.Top('432px');
  Panel1.Left('130px');
  Panel1.Width('70px');
  Panel1.Height('22px');
  Panel1.Caption('ккал/сутки');
  Panel1.Border('none');
  Form.AddComponent(Panel1);
  //---
  Panel2   = new TPanel();
  Panel2.Top('5px');
  Panel2.Left('170px');
  Panel2.Width('70px');
  Panel2.Height('22px');
  Panel2.Caption('ЖИВОТНЫЕ');
  Panel2.Border('none');
  Form.AddComponent(Panel2);
  //---
  Panel3   = new TPanel();
  Panel3.Top('5px');
  Panel3.Left('610px');
  Panel3.Width('70px');
  Panel3.Height('22px');
  Panel3.Caption('РАСТЕНИЯ');
  Panel3.Border('none');
  Form.AddComponent(Panel3);
  //---
  Button1   = new TButton();
  Button1.Top('432px');
  Button1.Left('230px');
  Button1.Width('110px');
  Button1.OnClick(Button1Click);
  Button1.Caption('Завтрак');
  Form.AddComponent(Button1);
  //---
  Button2   = new TButton();
  Button2.Top('432px');
  Button2.Left('350px');
  Button2.Width('110px');
  Button2.OnClick(Button2Click);
  Button2.Caption('Второй завтрак');
  Form.AddComponent(Button2);
  //---
  Button3   = new TButton();
  Button3.Top('432px');
  Button3.Left('470px');
  Button3.Width('110px');
  Button3.OnClick(Button3Click);
  Button3.Caption('Обед');
  Form.AddComponent(Button3);
  //---
  Button4   = new TButton();
  Button4.Top('432px');
  Button4.Left('590px');
  Button4.Width('110px');
  Button4.OnClick(Button4Click);
  Button4.Caption('Полдник');
  Form.AddComponent(Button4);
  //---
  Button5   = new TButton();
  Button5.Top('432px');
  Button5.Left('710px');
  Button5.Width('110px');
  Button5.OnClick(Button5Click);
  Button5.Caption('Ужин');
  Form.AddComponent(Button5);
  //---
  Memo1 = new TMemo();
  Memo1.Top('25px');
  Memo1.Left('5px');
  Memo1.Width('430px');
  Memo1.Height('400px');
  Form.AddComponent(Memo1);
  //---
  Memo2 = new TMemo();
  Memo2.Top('25px');
  Memo2.Left('442px');
  Memo2.Width('430px');
  Memo2.Height('400px');
  Form.AddComponent(Memo2);
  //---
  Form.Build();
}
//------------------------------------------------
