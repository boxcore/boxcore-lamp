PHP NOTE 9 mysql ��ϰ
@20130611 by boxcore

Լ����
tabname������
dbname:���ݿ���
fieldname �� field+n : �ֶ���
oldTabName:�ɱ���
newTabName:�±���

--------------------
һ�����ݿ����
--------------------

1.MySQl�������̣�MySQl �����,MySQl�ͻ��ˣ�
2.���ݿ��Ʒ���ࣺ��ϵ�����ݿ� ,�ǹ�ϵ�����ݿ⣻

3.���ݱ���ַ���:Client,Conn,Server,DB

     1 ��my.ini����Ĭ���ַ�����
          dafault-character-set=utf8     # client & Conn charset;
          character-set-server=utf8       # server & DB charset;
     2 ��PHP������ÿͻ����ַ����� mysql_query("set name utf8");

     3 ��������ʱָ���ַ���������
          create table tab(...)engine=MyISAM DEFAULT CHARSET=utf8; ����д��
          create table tabname(...)type=mysiam default character set utf8 collate utf8_general_ci;

4.���ݱ���ɣ���ṹ�ļ� (),�������ļ�(), �������ļ� ();

5.���ݿ����棺InnoDB֧������������֧��ȫ�������� MyISAM֧��ȫ����������֧������ MEMORY��MyISAM һ����ֻ�����������ݱ������ڴ�����Ǵ����У������ٶȸ��졣

----------------------
�������ݿ�ĳ��ò�����
----------------------

1.���ݿ�����ӣ�mysql -uroot -p123 -h192.168.2.2
2.�˳�MySQL:exit|quit|Ctrl+C
3.�ж����ݿ�Ĳ�����\c
4.MySQl�������Ĺرպ��˳���net stop mysql || net start mysql

5.MySQl���û����޸ģ�set password=password("���� ")��
     �����û��� CREATE USER 'test1'@'localhost' IDENTIFIED BY  '***';
6.MySQl���û���Ȩ��grant all on *.* to user1@192.168.190.20 identified by "����";
     GRANT ALL PRIVILEGES ON  `test1\_%` . * TO  'test1'@'localhost';
7.ˢ��Ȩ���磺flush privileges;
     * �ڿͻ����޸��û�Ȩ�޺���Ҫˢ�����ݿ⻺��
8.�鿴�û���Ȩ
     use mysql
     select user,password,host from user;
10.ɾ���û�
     ����һ�� drop user user1@"%";
     ��������
          use mysql
          delete from user where user=" �û���";

-----------------
�������ݿ�Ĳ���
-----------------
1.�������ݿ�     create database dbname ��
2.�鿴���ݿ�     show databases;
3.ɾ�����ݿ�     drop database dbname ��
4.�л����ݿ�     use dbname ��


-----------
�ġ������
-----------
1.�鿴��show tables ��
2.������create table tabname (field1 ��field2�� fieldn);
3.ɾ����dorp table [if exists] tabname ��
4.�޸ı�����rename table oldTabName to newTabName ��
5.��ѯ��ṹ��desc tabname��


--------------------
�塢�����ݹ���
--------------------

1.�������ݣ�insert
insert into user(name) values("user4");

2.ɾ�����ݣ�delete
//�����where ������������� whereȫ��ɾ�������ʱ��Ӧ���� truncate�������
delete from user where id>=3 and id<=5;
delete from user where id between 3 and 5;

3.�޸����ݣ�update
update user set name='user5',age=20 where id=5;
//��mysql ��û��==��ֻ�� =����������ֵ���ְ����Ƚ�

4.��ѯ���ݣ�select



-----------------------
���������ֶ�����
-----------------------

1.��ֵ     // ��ʾ�ʹ�С
int|float|tinyint
     ��tinyint��ֵ���͵��޷���ȡֵ��Χ�� 0-255
     ��int��ֵ���͵��޷���ȡֵ��Χ�� 0-42��

2.�ַ��� // ��ʾ�͸���
char|varchar|enum|set
     ��char(3)����˼��ʲô�� 0-255
     ��varchar(3)����˼��ʲô�� 0-65535

3.���ں�ʱ��( ��ֵ)
date|time|datetime|year|timestamp
     ��php�а�ʱ��ӹ���ʱ������ŵ� mysql�е�int ��



-------------------
�ߡ������ֶ�����
-------------------
1.unsigned
2.zerofill
3.auto_increment
4.null
5.not null     # ������Ա����� ,�����һ������Ƴ�not null,��ô�� defaultĬ��ֵ
6.default


-----------------
��.���ݱ������
-----------------
1.myisam     // Ĭ�Ͼ��� myisam
2.innodb     // ����

     ������ʱָ�������ͣ� create table t1(id int) engine=innodb;
     �޸ı��������ͣ� alter table tablename engine=innodb;
     �鿴�����ͣ� show create table tabname;


-------------------
��.���ݱ���������
-------------------

1.�������� primary key һ������ֻ����һ����������

������� :
1).����ʱ�ͼ���ȥ
2).��alter ����
     alter table t2 add primary key(id);  // ������
     alter table t2 modify id int unsigned auto_increment; // ���޷��ź���������

ɾ������ :
     alter table t2 modify id int; // ���޷��ź���������
     alter table t2 drop primary key;

2.Ψһ����     unique index
     // ÿһ�ж�������Ψһ����������ֵ�����ظ�ֵ

3.��ͨ����     index

     ������� :alter table user add index in_name(name);
     ɾ������ :alter table user drop index in_name;

//ÿһ�ж���������ͨ����

4.ȫ������     fulltext


------------------------
��.�޸����ݱ�ṹ -alter
------------------------

1.�޸��ֶ�
1)change
��alter table user change age sex int;   
#��age ���ֶ�������Ϊ sex�������ֶ�����Ϊint���������ֶ������޸��ֶ�����
//�޸��ֶ�����ʱ���������ԭ�е� int����varchar ���ԣ������д���Իᱨ��
2)modify
��alter table user modify age tinyint;

2.����ֶ�
     ��alter table user add age int;  //Ĭ�ϼӵ����
     ��alter table user add age int first;  //�ӵ���ǰ��ȥ
     ��alter table user add age int after id;  //�ӵ�id ����

3.ɾ���ֶ�
     ��alter table user drop age;

4.�������
     ��alter table tab62 add primary key(id);
     ��alter table tab62 modify id int unsigned auto_incrment;
     ��alter table tab62 add unique un_name(name);
     ��alter table tab62 add index in_pass(pass);

5.ɾ������
     ��alter table tab62 modify id int;
     ��alter table tab62 drop primary key;
     ��alter table tab62 drop index in_pass;
     ��alter table tab62 drop unique un_name;

6.���ı�����
     1)rename table tab62 to tab26; �޸ı��������ֶ�
     2)alter table user rename to user1;

7.����auto_increment ���Եĳ�ʼֵ
alter table user auto_increment=1;
//truncate user;  Ч�ʿ죬�����б��Զ��� 1��ʼ����ձ����������ݣ�


8.���ı����ƣ�alter table �ɱ��� rename as �±���

9.ɾ����dorp table [if exists] ������


-----------------------------------
�ṹ����ѯ���� sql�����ĸ�����:
-----------------------------------
1.DDL   // ���ݶ������� ,create,drop,alter
2.DML   // ���ݲ������� ,insert,update,delete
3.DQL   // ���ݲ�ѯ���� ,select
4.DCL   // ���ݿ������� ,grant,commit,rollback


----------------------------
�������ݱ��е����ݼ�¼ (DML)
----------------------------
1.insert
eg:insert into user(name) values("user4");

2.update
update user set name="user4" where id=4;
//��mysql ��û��==��ֻ�� =����������ֵ���ְ����Ƚ�
update user set name='user5',age=20 where id=5;

3.delete
//�����where ������������� whereȫ��ɾ�������ʱ��Ӧ���� truncate�������
delete from user where id>=3 and id<=5; ��ͬ�� delete from user where id between 3 and 5;

---------------------------------
���ݲ�ѯ���ԣ� DQL��--select ʹ��
---------------------------------

1.ѡ���ض����ֶ�
select id,name from user;
//select * from user;


2.���ֶ�ȡ����-as
select id,name from user;
select id maoxian,name from user;
select id as maoxian,name from user;


3.distinct�ؼ��ֵ�ʹ��
//ȡ��Ψһֵ
select distinct age from user;


4.ʹ��where �������в�ѯ
select * from user where id>=3 and id<=5;


5.��ѯ��ֵnull
select * from user where age is null;
select * from user where age is not null;


6.between and��ʹ�÷���
select * from user where id between 3 and 5;


7.in��ʹ�÷���
select * from user where id=1 or id=2 or id=10;
select * from user where id in(1,2,10);   ����ʹ�����


8.like��ʹ�÷���
//ģ����ѯ,text ���Ͳ��ܼ�����
% ƥ������
_ ƥ��һ���ַ�
select * from user where  name like "%mysql%";  //% ��ǰ��name��һ�е�������ʧЧ


9.ʹ��order by �Բ�ѯ�������
//����asc ��desc��һ��������һ������
select * from user order by id asc;  // Ĭ�Ͼ������� ,���ִ�С����
select * from user order by id desc;  // Ĭ�Ͼ������� ,���ִӴ�С


10.ʹ��limit �޶�������� (��ҳʵ��)
select * from user order by id limit 0,2;
select * from user order by id limit 5; //limit 0,5  ǰ���


11.concat() ���Ӻ���
select concat(id,age) from user;     # �����ֵΪÿһ����ָ������ַ�����ӡ�
select concat("aaa","bbb","cccc");  # ������ӵ��ַ����� aaabbbccc,���û��˫����������Ϊ���ֶΣ�����


12.rand() �����
eg: select * from user order by rand() limit 3;


13.ʹ��ͳ�ƺ�����
count() ͳ�Ƹ���
sum() ���
avg() ƽ��ֵ
max() ���ֵ
min() ��Сֵ
eg:
select count(id),sum(age),avg(age),max(id),min(id) from user;


14.group by����ۺϵ� ʹ��-select 
��Ϻϼƺ���������һ�������жԽ�������з���
//����  �ۺ�
//ֻ����û�����壬�����ú���ȥ�ۺ� .
eg: select banji,sum(score),count(id) from user group by banji; // �Ӱ༶����ͳ��ÿ������ܷ�����������
eg2:����ÿ���ͻ����ܽ��ܶ����� :
------------------------------------
O_Id OrderDate      OrderPrice Customer
1      2008/12/29      1000     Bush
2      2008/11/23      1600     Carter
3      2008/10/05      700      Bush
4      2008/09/28      300      Bush
5      2008/08/06      2000     Adams
6      2008/07/21      100      Carter
------------------------------------
ִ����䣺 SELECT Customer,SUM(OrderPrice) FROM Orders GROUP BY Customer;

���������������
-------------------------
Customer SUM(OrderPrice)
Bush           2000
Carter           1700
Adams           2000
--------------------------


---------------------------------------
���ݲ�ѯ���ԣ� DQL��2--select �Ķ���ѯ
---------------------------------------
�����������ַ�������ʵ��һ�ֱ�����ѡ����ͨ����ѯ��

1.��ͨ����ѯ
1�������ѯ
mysql> select user.id,user.name,user.score,user.banji,tel.num from user,tel where user.id=tel.uid;
2�������ѯ
mysql> select user.name,tel.num,qq.qq from user,tel,qq where user.id=tel.uid and user.id=qq.uid;


2.Ƕ�ײ�ѯ| �Ӳ�ѯ-in
select * from user where id in(select uid from tel);

3.�����Ӳ�ѯ-left join on
select user.id,user.name,tel.num from user left join tel on user.id=tel.uid;
//����������ߵı�Ϊ�������������߱���������ݣ�����������ұ߱�����ݣ�û�����Ӧ�����ݾ�Ϊ null


*��ͨ����ѯ�����ַ������ֱ���ʲô����
��ͨ����ѯ�����������ҿ����������������
Ƕ�ײ�ѯ����������ֻ�����һ���������
�����Ӳ�ѯ���������Ȱ���ߵı�ȫ��������ұߵı����������������� null


==========================================
��ϰ --��õ��﷨��
-----------------------------------
1.DDL ���ݶ�������,create,drop,alter
1)create database {database}
2)create table {table}();


2.DML ���ݲ�������,insert,update,delete
1��insert into ���� [(�ֶ� 1,�ֶ�2, �ֶ�n)] values ('ֵ 1','ֵ2',' ֵn');
2��update ���� set �ֶ��� =���ʽ[, �ֶ�n=���ʽ n] [where ����] [order by �ֶ�] [limit ���� ];
3��delete from ���� [where ���� ] [order by �ֶ�] [limit ����];


3.DQL ���ݲ�ѯ����,select
select [all|distinct] {*|table.*|[table.]field[as alias1][,[table.]field2[as alias2][,...]]} from tableexpression[,...][in externaldatabase] [where...] [group by...] [having...] [order by...] [limit count];

4.DCL ���ݿ�������,grant,commit,rollback
1��grant Ȩ�� on ���ݿ� .���ݱ� to �û�@��¼���� indentified by "����"


  
