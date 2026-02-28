# 复变函数
### 复数、复变函数

#### 复数

$z=x+iy,\bar{z}=\overline{x+iy}=x-iy,x,y\in \mathbb{R}$

$x=\text{Re}(z),y=\text{Im}(z)$

复数之间只能判断相等，不能判断大小。

复数的模: $r=|z|=\sqrt{x^2+y^2}$

复数的幅角: $\theta,\tan\theta=\displaystyle\frac yx,\theta=\text{Arg}\,z=\arg z+2k\pi(k=0,\pm1,\pm2,\cdots)$

幅角主值: $-\pi<\arg z\leq\pi$

三角表达式: $z=r(\cos \theta+i\sin \theta)$

欧拉公式: $e^{i\theta}=\cos\theta+i\sin\theta$

复数的指数表示: $z=re^{i\theta}=|z|e^{i\arg z}$

复数相加，遵循平行四边形法则: $z_1+z_2=(x_1+x_2)+i(y_1+y_2)$

复数相乘: $z_1z_2=r_1e^{i\theta_1}r_2e^{i\theta_2}=r_1r_2e^{i(\theta_1+\theta_2)}$

复数相除: $\displaystyle\frac{z_1}{z_2}=\displaystyle\frac{r_1e^{i\theta_1}}{r_2e^{i\theta_2}}=\displaystyle\frac{r_1}{r_2}e^{i(\theta_1-\theta_2)}$

所以: $\text{Arg}\,(z_1z_2)=\text{Arg}\,z_1+\text{Arg}\,z_2,\;\text{Arg}\,\displaystyle\frac{z_1}{z_2}=\text{Arg}\,z_1-\text{Arg}\,z_2$

所以: $z_1z_2=(x_1+iy_1)(x_2+iy_2)=(x_1x_2-y_1y_2)+i(x_1y_2+x_2y_1)\;;\displaystyle\frac{z_1}{z_2}=\frac{x_1+iy_1}{x_2+iy_2}=\frac{(x_1+iy_1)(x_2-iy_2)}{x_2^2+y_2^2}=\displaystyle\frac{x_1x_2+y_1y_2+i(x_2y_1-x_1y_2)}{x_2^2+y_2^2}$

复数的乘幂: $z^n=r^ne^{in\theta}=r^n(\cos n\theta+i\sin n\theta),\,|z^n|=|z|^n,\,\text{Arg}\,z^n=n\text{Arg}\,z$

棣莫弗公式: $(\cos\theta+i\sin\theta)^n=\cos n\theta+i\sin n\theta$

复数的方根(对应$n$个独立的根): $\sqrt[n]{z}=r^{\frac 1n}e^{i\frac{\theta+2k\pi}{n}}=r^{\frac 1n}\left(\cos\frac{\theta+2k\pi}{n}+i\sin\frac{\theta+2k\pi}{n}\right)$

#### 复变函数

复变函数$w=f(z)=u(x,y)+iv(x,y)$可能是单值函数也可能是多值函数

设函数$w=f(z)$于点集$E$上有定义，$z_0$为$E$的聚点。如存在一复数$w_0$，使对$\forall \varepsilon>0,\exists \delta>0$,只要$0<|z-z_0|<\delta,z\in E$,就有$|f(z)-w_0|<\varepsilon.$则称函数$f(z)$沿$E$于$z_0$有极限$w_0$，并记为$\displaystyle\lim_{z\to z_0,z\in E}f(z)=w_0.$

复变函数的连续性是与实部和虚部两个实函数的连续性是等价的。$\displaystyle\lim_{z\to z_0,z\in E}f(z)=f(z_0).$

重要结论: $\arg z\;(-\pi < z\leq\pi)$在原点与负实轴上不连续。

扩充复平面$\mathbf{C}_ {\infty}=\mathbf{C}+\{\infty\}$，复球面，广义极限和广义连续。

### 解析函数

#### 解析函数

复变函数的导数与微分:
$$
f'(z_0)=\displaystyle\lim_{\Delta z_0\to 0}\frac{\Delta w}{\Delta z}=\displaystyle\lim_{z\to z_0}\frac{f(z)-f(z_0)}{z-z_0}=\displaystyle\lim_{\Delta z\to 0}\frac{f(z_0+\Delta z)-f(z_0)}{\Delta z}(\Delta z\neq 0)
$$

称$f'(z)\Delta z$为$w=f(z)$在$z$点的微分。记为$\text{d}w$或$\text{d}f(z)$。

$f(z)$在点$z$可导与在点$z$可微是等价的。

函数$w=f(z)$在区域$D$内可微，称$f(z)$为区域$D$内的解析函数，或称$f(z)$在区域$D$内解析。

解析与区域密切联系，区域内的解析函数也称为内的全纯函数或正则函数。

可微是局部性质，解析是区域内的整体性质。

若函数$f(z)$在点$z_0$不解析，但在点$z_0$的任意邻域内总有$f(z)$的解析点，则称$z_0$为函数$f(z)$的奇点。

在某点解析一定在某点可导，在某点可导不一定在某一点解析.

$f(z)=u(x,y)+iv(x,y)$的柯西-黎曼方程:
$$
\displaystyle\frac{\partial u}{\partial x}=\displaystyle\frac{\partial v}{\partial y},\displaystyle\frac{\partial u}{\partial y}=-\displaystyle\frac{\partial v}{\partial x}
$$
极坐标$z=re^{i\theta}$的柯西-黎曼方程:
$$
\displaystyle\frac{\partial u}{\partial r}=\frac1r\cdot\displaystyle\frac{\partial v}{\partial \theta},\displaystyle\frac{\partial u}{\partial \theta}=-r \displaystyle\frac{\partial v}{\partial r}
$$

函数$f(z)=u(x,y)+iv(x,y)$在区域$D$内解析的充要条件是：(1)二元函数$u(x,y),v(x,y)$在区域$D$内可微。(2)$u(x,y),v(x,y)$在$D$内满足$C.-R.$方程。

同样也有$u_x,u_y,v_x,v_y$在$D$内连续。

上述条件满足时，在点的导数可以表示为下列形式之一:
$$
f'(z)=\displaystyle\frac{\partial u}{\partial x}+i \frac{\partial v}{\partial x}=\displaystyle\frac{\partial v}{\partial y}-i \displaystyle\frac{\partial u}{\partial y}=\displaystyle\frac{\partial u}{\partial x}-i \displaystyle\frac{\partial u}{\partial y}=\displaystyle\frac{\partial v}{\partial y}+i \displaystyle\frac{\partial v}{\partial x}
$$

用复变元和它的共轭来刻画复函数:
$$
\begin{cases}
x=\displaystyle\frac{z+\bar{z}}{2}\\
y=\displaystyle\frac{z-\bar{z}}{2i}.
\end{cases}
$$
于是$\text{d}f(z)=\displaystyle\frac{\partial f}{\partial z}\text{d}z+\displaystyle\frac{\partial f}{\partial \bar{z}}\text{d}\bar{z}=\displaystyle\frac{1}{2}\left(\frac{\partial f}{\partial x}-i \frac{\partial f}{\partial y}\right)\text{d}z+\displaystyle\frac{1}{2}\left(\frac{\partial f}{\partial x}+i \frac{\partial f}{\partial y}\right)\text{d}\bar{z}$

#### 初等解析函数

指数函数$f(z)=e^z=e^{x+iy}=e^x(\cos y+i\sin y),\forall z=x+iy,x,y\in \mathbb{R}$

对指数函数$e^z$来说，$|e^z|=e^x>0,\arg e^z=y$;在$z$平面上$e^z\neq0$.

指数函数$e^z$在$z$平面上解析，且$(e^z)'=e^z$.

指数函数$e^z$是以$2\pi i$为基本周期的周期函数$e^{2k\pi i}=1,k\in\mathbb{N}$。

极限$\displaystyle\lim_{z\to\infty}e^z$不存在，即$e^{\infty}$无意义。

数学分析中的微分中值定理不能直接推广到复平面上来。不过，洛必达(L'Hospital)法则在复平面却是成立的。

三角函数由指数函数推导得到，正弦函数$\sin z=\displaystyle\frac{e^{iz}-e^{-iz}}{2i},$ 余弦函数$\cos z=\displaystyle\frac{e^{iz}+e^{-iz}}{2}$。

三角函数在$z$平面上是解析的。

$\sin z$的零点为$z=n\pi\,(n=0,\pm1,\cdots)$，$\cos z$的零点为$z=(n+\displaystyle\frac{1}{2})\pi\,(n=0,\pm1,\cdots)$.

在复数域内不能再断言有界$|\sin z|\nleqslant1,|\cos z|\nleqslant1$。

其他三角函数(正切函数，余切函数，正割函数，余割函数)
$$
\tan z=\displaystyle\frac{\sin z}{\cos z},\cot z=\displaystyle\frac{\cos z}{\sin z},\sec z=\displaystyle\frac{1}{\cos z},\csc z=\displaystyle\frac{1}{\sin z}.
$$

双曲正弦函数，双曲余弦函数，双曲正切函数，双曲余切函数，双曲正割函数，双曲余割函数:
$$
\begin{aligned}
\sinh z=\displaystyle\frac{e^z-e^{-z}}{2},&\cosh z=\displaystyle\frac{e^z+e^{-z}}{2}\\
\tanh z=\displaystyle\frac{\sinh z}{\cosh z},\coth z=\displaystyle\frac{1}{\tanh z},&\text{sech} z=\displaystyle\frac{1}{\cosh z},\text{csch} z=\displaystyle\frac{1}{\sinh z}
\end{aligned}
$$

以上的函数都是初等单值周期函数。

#### 初等多值函数

对数函数是指数函数的反函数，即若$e^w=z\,(z\neq0,\infty),$则$w=\text{Ln}\,z.$

当限定$\arg z$取主值时，即$-\pi<\arg z\leqslant\pi$时，$\ln z$称为$\text{Ln}\,z$的主值。于是$\ln z=\ln|z|+i\arg z\;(-\pi<\arg z\leqslant\pi)$.

对数函数为多值函数，在除去原点和负实轴的平面内处处解析。

$\text{Ln}\,z=\ln z+2k\pi i\;(k=0,\pm1,\cdots)$,特别的，$\ln(-1)=\ln1+\pi i=\pi i;\text{Ln}(-1)=(2k+1)\pi i(k=0,\pm1,\cdots)$.

一般幂函数$w=z^{\alpha}=e^{\alpha\text{Ln}\,z}(z\neq0,\infty;\alpha\in\mathbb{R})$

一般幂函数在除原点和负实轴的平面内处处解析。

一般指数函数$w=\alpha^z=e^{z \text{Ln}\,\alpha}\;(\alpha\neq0,\infty,为一复常数)$

一般指数函数在整个复平面上解析，且指数函数是周期函数，周期是$2k\pi i$.

根式函数$w=\sqrt[n]{z}$是幂函数$z=w^n$的反函数($n$是大于1的整数)。

根式函数$w=\sqrt[n]{z}=\sqrt[n]{|z|}e^{i \frac{\arg z+2k\pi}{n}}(k=0,1,\cdots,n-1)$是多值的，有$n$个不同的值($n$为整数且$n\geqslant2$)。

根式函数在某些点附近无法连续定义所有值，这些点称为分支点。

对于$w=\sqrt[]{z-a}$，分支点是$z=a,z=\infty$.

绕分支点一圈，函数可能不会回到原来的值(即发生'分支跳跃')。

将多值函数变为单值函数的分支切割通常是条射线，对$\sqrt{z}$通常使用负实轴作为分支切割。

对$\sqrt[n]{z}$取负实轴做为支割线而得出的$n$个不同的分支，其中有一支在正实轴上取正实值的，称为$\sqrt[n]{z}$的主值支，可以表为:$(\sqrt[n]{z})_ 0=\sqrt[n]{r}e^{\frac{i\theta}{n}}(-\pi<\theta<\pi)$.

根式函数在复平面上不是处处解析的，只能在单连通区域(不含分支点)内定义解析分支。

具有多个有限支点的情况:

如函数$w=f(z)=\sqrt[n]{P(z)}$的支点，其中$P(z)$是任意的$N$次多项式，$P(z)=A(z-a_1)^{\alpha_1}\cdots(z-a_m)^{\alpha_m},a_1,a_2,\cdots,a_m$是$P(z)$的一切相异零点。$\alpha_1,\alpha_2,\cdots,\alpha_m$分别是它们的重数，合于$\alpha_1+\alpha_2+\cdots+\alpha_m=N$.

(a)$P(z)$可能的支点是$a_1,a_2,\cdots,a_m$和$\infty$;

(b)当且仅当$n$不能整除$\alpha_i$时，$a_i$是$\sqrt[n]{P(z)}$的支点。

(c)当且仅当$n$不能整除$N$时，$\infty$是$\sqrt[n]{P(z)}$的支点。

(d)如果$n$能整除$\alpha_1,\alpha_2,\cdots,\alpha_m$中若干个之和，则$\alpha_1,\alpha_2,\cdots,\alpha_m$中对应的那几个就可以联结成割线抱成团，即变点$z$沿只包含它们在其内部的简单闭曲线转一整周之后，函数值不变。这种抱成的团可能不止一个。其余不入团的点$a_i$则与点$\infty$联结成一条割线。

#### 调和函数

拉普拉斯算子$\Delta=\displaystyle\frac{\partial^2}{\partial x^2}+\frac{\partial^2}{\partial y^2}$

拉普拉斯方程$\Delta u=\displaystyle\frac{\partial^2 u}{\partial x^2}+\frac{\partial^2 u}{\partial y^2}=0$

如果二元实函数$H(x,y)$在区域$D$内有二阶连续偏导数，且满足拉普拉斯方程$\Delta H=0$，则称$H(x,y)$为区域$D$内的调和函数。

在区域内满足$C.-R.$方程$\displaystyle\frac{\partial u}{\partial x}=\frac{\partial v}{\partial y},\frac{\partial u}{\partial y}=-\frac{\partial v}{\partial x}$的两个调和函数$u,v$中，$v$称为$u$在区域$D$内的共轭调和函数。

求共轭调和函数的方法，偏积分法或者不定积分法。

已知$u(x,y)=x^2+xy-y^2$，求解析函数$f(z)=u+iv$，其中$f(i)=-1+i$.

法一:
$$
\begin{aligned}
\displaystyle\frac{\partial v}{\partial x}&=-\frac{\partial u}{\partial y}=2y-x\\
\displaystyle\frac{\partial v}{\partial y}&=\frac{\partial u}{\partial x}=2x+y\\
v&=\displaystyle\int\frac{\partial v}{\partial x}\text{d}x+\int \frac{\partial v}{\partial y}\text{d}y\\
&=\int(2y-x)\text{d}x+\int(2y+x)\text{d}y\\
&=2yx-\frac{1}{2}x^2+2xy+\frac{1}{2}y^2+C\\
&=\frac{1}{2}(y^2-x^2)+4xy+C\\
f(x+iy)&=f(i)=-1+i(\frac{1}{2}+C)=-1+i\\
x=0,y&=1,C=\frac{1}{2}\\
v&=\frac{1}{2}(y^2-x^2)+4xy+\frac{1}{2}\\
f(z)=&x^2+xy-y^2+i\frac{1}{2}(y^2-x^2+8xy+1)
\end{aligned}
$$

法二:
$$
\begin{aligned}
f'(z)&=\displaystyle\frac{\partial u}{\partial x}+i\frac{\partial v}{\partial x}\\
&=2x+y-i \frac{\partial u}{\partial y}\\
&=2x+y+i(2y-x)\\
&=(2-i)z\\
f(z)&=\int (2-i)z\text{d}z=\frac{1}{2}(2-i)z^2+C\\
f(i)&=-(1-\frac{1}{2}i)+C=-1+i\\
C&=\frac{1}{2}i
\end{aligned}
$$

### 复变函数的积分

#### 路径积分

如果和数$S_n=\displaystyle\sum_{k=1=0}^{n}f(\eta_k)\Delta z_k$,其中$\Delta z_k=z_k-z_{k-1}$的极限存在且等于$J$，则称$f(z)$沿$C$从$a$到$b$可积，而称$J$为$f(z)$沿$C$从$a$到$b$的积分，并以记号$\displaystyle\int_{C}^{}f(z)\text{d}z$表示。$C$称为积分路径，$\displaystyle\int_{C}^{}f(z)\text{d}z$表示$f(z)$沿$C$的正方向的积分(逆时针方向为正，顺时针方向为负)。

若函数$f(z)=u(x,y)+iv(x,y)$沿光滑或逐段光滑的曲线$C$连续，则$f(z)$沿$C$可积，且
$$
\displaystyle\int_{C}^{}f(z)\text{d}z=\displaystyle\int_{C}^{}u \text{d}x-v \text{d}y+i \displaystyle\int_{C}^{}v \text{d}x+u \text{d}y.
$$
这是一个形如第二型的曲线积分。

以上公式可以看作是函数$f(z)=u+iv$与微分$\text{d}x=\text{d}x+i\text{d}y$相乘后所得到的。

$\displaystyle\int_{C}^{}f(z)\text{d}z=\displaystyle\int_{C}^{}(u+iv)(\text{d}x+i \text{d}y)=\displaystyle\int_{C}^{}(u \text{d}x-v \text{d}y)+i\displaystyle\int_{C}^{}(v \text{d}x+u \text{d}y)$

设有光滑曲线$C:z=z(t)=x(t)+iy(t)(\alpha\leqslant t\leqslant\beta)$，这就表示$z'(t)$在$[\alpha,\beta]$上连续且有不为零的导数$z'(t)=x'(t)+iy'(t)$。又设$f(z)$沿$C$连续，令$f[z(t)]=u[x(t),y(t)]+iv[x(t),y(t)]=u(t)+iv(t)$，我们有
$$
\begin{aligned}
\displaystyle\int_{C}^{}f(z)\text{d}z&=\displaystyle\int_{C}^{}u \text{d}x-v \text{d}y+i \displaystyle\int_{C}^{}u \text{d}y+v \text{d}x\\
&=\displaystyle\int_{\alpha}^{\beta}[u(t)x'(t)-v(t)y'(t)]\text{d}t+i \displaystyle\int_{\alpha}^{\beta}[u(t)y'(t)+v(t)x'(t)]\text{d}t\\
&=\displaystyle\int_{\alpha}^{\beta}f[z(t)]z'(t)\text{d}t.
\end{aligned}
$$

若$f(z)$全平面解析，那么$\displaystyle\int_{C}^{}f(z)\text{d}z$的结果仅仅与起点终点有关，与路径无关。

一个重要的积分计算$\displaystyle\int_{C}^{}\displaystyle\frac{\text{d}z}{(z-a)^n}$,这里$C$表示以$a$为心$\rho$为半径的圆周(注意:积分值与$a,\rho$均无关，$a$可以为0.)。<br>
证：$C$参数方程为:$z-a=\rho e^{i\theta},0\leqslant\theta\leqslant2\pi.$<br>
故
$$
\displaystyle\int_{C}^{}\frac{\text{d}z}{z-a}\overset{\int_C f(z)\text{d}z=\int_{\alpha}^{\beta}f[z(t)]z'(t)\text{d}t}{=}\displaystyle\int_{0}^{2\pi}\frac{i\rho e^{i\theta \text{d}\theta}}{\rho e^{i\theta}}=i \displaystyle\int_{0}^{2\pi}\text{d}\theta=2\pi i;
$$
当$n$为整数且$n\neq1$时,<br>
$$
\begin{aligned}
\displaystyle\int_{C}^{}\frac{\text{d}z}{(z-a)^n}&=\displaystyle\int_{0}^{2\pi}\frac{i\rho e^{i\theta \text{d}\theta}}{\rho^n e^{in\theta}}=\frac{i}{\rho^{n-1}}\displaystyle\int_{0}^{2\pi}e^{-i(n-1)\theta}\text{d}\theta\\
&=\displaystyle\frac{i}{\rho^{n-1}}\left[\displaystyle\int_{0}^{2\pi}\cos(n-1)\theta \text{d}\theta-i \displaystyle\int_{0}^{2\pi}\sin(n-1)\theta \text{d}\theta\right]\\
&=0.
\end{aligned}
$$

实函数的积分中值定理，不能直接推广到复变函数上来，例如$\displaystyle\int_{0}^{2\pi}e^{i\theta}\text{d}\theta=\displaystyle\int_{0}^{2\pi}\cos\theta \text{d}\theta+i \displaystyle\int_{0}^{2\pi}\sin\theta \text{d}\theta=0$.但是$e^{i\theta}(2\pi-0)\neq0$.

#### 柯西积分定理

柯西积分定理(柯西-古萨尔基本定理):设函数$f(z)$在平面上的单连通区域$D$内解析，则沿任意一条封闭曲线$C$的环路积分为0。
$$
\oint_C f(z)\text{d}z=0.
$$

设$f(z)$在单连通区域$D$内解析，则对任意两点$z_0,z_1$，$\displaystyle\int_{C}^{}f(z)\text{d}z$不依赖起点与终点间的曲线，与积分路径无关。

不定积分:设函数$f(z)$在单连通区域$D$内解析，则$F(z)=\displaystyle\int_{z_0}^{z}f(\zeta)\text{d}\zeta$(动点$z\in D$,定点$z_0\in D$)在$D$内解析，且$F'(z)=f(z)$。

#### 复合闭路定理

复合闭路定理:<br>
(1)设$C$为多连通区域$D$内的一条简单闭曲线;<br>
(2)$C_1,C_2,\cdots,C_n$是在$C$内部的简单闭曲线，它们既不包含也不相交，且以$C_1,C_2,\cdots,C_n$为边界的区域全部包含于$D$;<br>
(3)$f(z)$在$D$内解析。则
$$
\displaystyle\oint_{C}^{}f(z)\text{d}z=\displaystyle\sum_{k=1}^{n}\oint_{C_k}f(z)\text{d}z.
$$

化整为零，对于特定的函数，如果存在奇点，在单连通区域不处处解析，则构造多个小的闭合回路，构造处处解析的多连通区域，将积分化为若干小曲线的积分和.

例题:计算$\displaystyle\oint_C \frac{\text{d}z}{z^2-a^2}$，$C$为$|z-a|=a$的正向简单曲线.<br>
解:$f(z)$有两个奇点
$$
\begin{aligned}
\oint_C \frac{\text{d}z}{z^2-a^2}&=\oint_C \left[\left(\frac{1}{z-a}-\frac{1}{z+a}\right)\frac{1}{2a}\right]\text{d}z\\
&=\frac{1}{2a}\oint_C \frac{\text{d}z}{z-a}-\frac{1}{2a}\oint_C \frac{\text{d}z}{z+a}\\
z=a为奇点,&\oint_C \frac{\text{d}z}{z-a}=2\pi i,\oint_C \frac{\text{d}z}{z+a}=0.\\
\oint_C \frac{\text{d}z}{z^2-a^2}&=\frac{\pi}{a}i.
\end{aligned}
$$

#### 柯西积分公式

如果一个函数$f(z)=u(z,y)+iv(x,y)$在区域$D$内处处解析，$D$的边界是周线或复周线$C$，在$\bar{D}=D+C$上连续，则有
$$
f(z)=\frac{1}{2\pi i}\oint_C \frac{f(\zeta)}{\zeta-z}\text{d}\zeta\,(z\in D)
$$

柯西积分公式也可写成$\displaystyle\oint_{C}^{}\frac{f(\zeta)}{\zeta-z}\text{d}\zeta=2\pi if(z).$可以借此计算某些周线积分(积分路径是周线的积分).

#### 解析函数的平均值定理

如果函数$f(z)$在圆$|\zeta-z_0|< R$内解析，在闭圆$|\zeta-z_0|\leqslant R$上连续，则
$$
f(z_0)=\frac{1}{2\pi}\displaystyle\int_{0}^{2\pi}f(z_0+Re^{i\phi})\text{d}\phi.
$$
即$f(z)$在圆心$z_0$的值等于它在圆周上的值的算术平均数。

#### 高阶导数公式

如果一个函数$f(z)=u(z,y)+iv(x,y)$在区域$D$内处处解析，$D$的边界是周线或复周线$C$，在$\bar{D}=D+C$上连续。则函数$f(z)$在区域$D$内有各阶导数，并且
$$
f^{(n)}(z)=\frac{n!}{2\pi i}\displaystyle\int_{C}^{}\frac{f(\zeta)}{(\zeta-z)^{n+1}}\;(z\in D,n=1,2,\cdots)
$$
这是一个用解析函数$f(z)$的边界值表示其各阶导函数内部值的积分公式。

这刻画了解析函数的无穷可微性。

#### 柯西不等式

设函数$f(z)$在区域$D$内解析，$a$为$D$内一点，以$a$为心作圆周$\gamma:|\zeta-a|=R$，只要$\gamma$及其内部$K$均含于$D$，则有
$$
|f^{(n)}(a)|\leqslant \displaystyle\frac{n! M(R)}{R^n}.
$$
其中$M(R)=\displaystyle\max_{|z-a|=R}|f(z)|,n=1,2,\cdots$。

注：柯西不等式是对解析函数各阶导数模的估计式，说明解析函数在解析点的各阶导数的估计与它的解析区域的大小密切相关。

在整个复平面上解析的函数称为整函数。

#### 刘维尔(Liouville)定理

有界整函数$f(z)$必定为常数。

这是一个非局部性命题，称之为模有界定理。其逆:非常数的整函数必无界;也为真。

#### 莫雷拉(Morera)定理

柯西积分定理的逆定理，称之为莫雷拉定理。

若函数$f(z)$在单连通区域$D$内连续，且对$D$内的任一周线$C$，有
$$
\displaystyle\int_{C}^{}f(z)\text{d}z=0.
$$
则$f(z)$在$D$内解析。

刻画解析函数的第三个等价定理:<br>
函数$f(z)$在区域$G$内解析的充要条件是:<br>
(1)$f(z)$在$G$内连续.<br>
(2)对任一周线$C$，只要$C$及其内部全含于$G$内，就有
$$
\displaystyle\int_{C}^{}f(z)\text{d}z=0.
$$

### 解析函数的幂级数表示法

#### 复数项级数

设$\alpha_n=a_n+ib_n(n=1,2,\cdots)$，$a_n$及$b_n$为实数，则复级数$\displaystyle\sum_{n=1}^{\infty}\alpha_n=\alpha_1+\alpha_2+\cdots+\alpha_n+\cdots$收敛于$s=a+ib$($a,b$为实数)的充要条件为:实级数$\displaystyle\sum_{n=1}^{\infty}a_n$及$\displaystyle\sum_{n=1}^{\infty}b_n$分别收敛于$a$及$b$。

复数列收敛的本质就是实部与虚部的两个实数列的收敛.

柯西收敛准则:复级数$\displaystyle\sum_{n=1}^{\infty}\alpha_n=\alpha_1+\alpha_2+\cdots+\alpha_n+\cdots$收敛的充要条件是:对任给$\varepsilon>0$，存在正整数$N(\varepsilon)$，当$n> N$且$p$为任何正整数时，$|\alpha_{n+1},\alpha_{n+2},\cdots,\alpha_{n+p}|<\varepsilon$。

显然，收敛级数的各项必是有界的。

#### 复函数项级数

对于级数$f_1(z)+f_2(z)+\cdots+f_n(z)+\cdots$，如果在点集$E$上有一个函数$f(z)$，使对任意给定的$\varepsilon>0$，存在正整数$N=N(\varepsilon)$，当$n> N$时，对一切的$z\in E$，均有$|f(z)-s_n(z)|<\varepsilon\,(s_n(z)=\displaystyle\sum_{k=1}^{n}f_k(z))$，则称级数在$E$上一致收敛于$f(z)$。

柯西一致收敛准则:级数$f_1(z)+f_2(z)+\cdots+f_n(z)+\cdots$在点集$E$上一致收敛于某函数的充要条件是:任给$\varepsilon>0$，存在正整数$N=N(\varepsilon)$，使当$n> N$时，对一切$z\in E$，均有$|f_{n+1}(z)+\cdots+f_{n+p}(z)|<\varepsilon.(p=1,2,\cdots)$。

优级数准则(一种控制收敛定理):如果有正数列$M_n(n=1,2,\cdots)$，使对一切$z\in E$，有$|f_n(z)|\leqslant M_n(n=1,2,\cdots)$。而且正项级数$\displaystyle\sum_{n=1}^{\infty}M_n$收敛，则复函数项级数$\displaystyle\sum_{n=1}^{\infty}f_n(z)$在点集$E$上绝对收敛且一致收敛。

解析函数项级数的魏尔斯特拉斯定理:设函数$f_n(z)(n=1,2,\cdots)$在区域$D$内解析;$\displaystyle\sum_{n=1}^{\infty}f_n(z)$在$D$内内闭一致收敛于函数$f(z)$。则<br>
(1)函数$f(z)$在区域$D$内解析;<br>
(2)$f^{(p)}(z)=\displaystyle\sum_{n=1}^{\infty}f_n^{(p)}(z)\,(z\in D,p=1,2,\cdots)$

#### 幂级数

幂级数是最简单的解析函数项级数。

阿贝尔(Abel)定理:如果幂级数$\displaystyle\sum_{n=0}^{\infty}c_n(z-a)^n=c_0+c_1(z-a)+c_2(z-a)^2+\cdots+c_n(z-a)^n+\cdots$在某点$z_1(\neq a)$收敛，则它必在圆$K:|z-a|<|z_1-a|$(即以$a$为心，圆周通过$z_1$的圆)内绝对收敛且内闭一致收敛。

若幂级数在某点$z_2(\neq a)$发散，则它在以$a$为心并通过$z_2$的圆周外部发散。

柯西-阿达马(Cauchy-Hadamard)公式，收敛半径的求法。<br>
如若幂级数$\displaystyle\sum_{n=0}^{\infty}c_n(z-a)^n$的系数$c_n$满足<br>
$\displaystyle\lim_{n\to\infty}\left|\frac{c_{n+1}}{c_n}\right|=l,$(达朗贝尔(d'Alembert))<br>
或$\displaystyle\lim_{n\to\infty}\sqrt[n]{|c_n|}=l,$(柯西)<br>
或$\displaystyle\overline{\lim_{n\to\infty}}\sqrt[n]{|c_n|}=l$(柯西-阿达马)<br>
则幂级数$\displaystyle\sum_{n=0}^{\infty}c_n(z-a)^n$的收敛半径
$$
R=\begin{cases}
\displaystyle\frac{1}{l}, &l\neq 0,l\neq+\infty\\
0, &l=+\infty\\
+\infty, &l=0.
\end{cases}
$$

幂级数和的解析性<br>
(1)幂级数$f(z)=\displaystyle\sum_{n=0}^{\infty}c_n(z-a)^n$的和函数$f(z)$在其收敛圆$K:|z-a|< R(0< R\leqslant+\infty)$内解析。<br>
(2)在$K$内，幂级数$f(z)$可以逐项求导至任意阶，即
$$
f^{(p)}(z)=p!c_p+(p+1)p\cdots 2c_{p+1}(z-a)+\cdots+n(n-1)\cdots(n-p+1)c_n(z-a)^{n-p}+\cdots(p=1,2,\cdots)
$$
且与$f(z)$的收敛半径相同。<br>
(3)$c_p=\displaystyle\frac{f^{(p)}(a)}{p!}(p=0,1,2,\cdots).$

将函数$\displaystyle\frac{1}{z-b}$展开成$(z-a)$的幂级数。<br>
解:
$$
\begin{aligned}
\frac{1}{z-b}&=\frac{1}{(z-a)-(b-a)}=-\frac{1}{b-a}\frac{1}{1-\displaystyle\frac{z-a}{b-a}}\\
&=-\frac{1}{b-a}\displaystyle\sum_{n=0}^{+\infty}\left(\displaystyle\frac{z-a}{b-a}\right)^n,(\left|\displaystyle\frac{z-a}{b-a}\right|<1)
\end{aligned}
$$

#### 泰勒(Taylor)级数

任意一个具有非零收敛半径的幂级数在其收敛圆内收敛于一个解析函数。同时，关于幂级数的这个性质的逆命题也是成立的。

泰勒定理:设$f(z)$在区域$D$内解析，$a\in D,$只要圆$K:|z-a|< R$含于$D$，则$f(z)$在$D$内能展开成幂级数
$$
f(z)=\displaystyle\sum_{n=0}^{\infty}c_n(z-a)^n
$$
其中系数
$$
c_n=\displaystyle\frac{1}{2\pi i}\displaystyle\int_{\Gamma_{\rho}}^{}\frac{f(\zeta)}{(\zeta-a)^{n+1}}\text{d}\zeta=\frac{f^{n}(a)}{n!}(\Gamma_{\rho}:|\zeta-a|=\rho,0< \rho< R;n=0,1,2,\cdots)
$$
且展开式是唯一的。

#### 幂级数的和函数在其收敛圆周上的状况

如果幂级数$\displaystyle\sum_{n=0}^{\infty}c_n(z-a)^n$的收敛半径$R>0$，且
$$
f(z)=\displaystyle\sum_{n=0}^{\infty}c_n(z-a)^n\,(z\in K:|z-a|< R),
$$
则$f(z)$在收敛圆周$C:|z-a|=R$上至少有一个奇点，即不可能有这样的解析函数$F(z)$存在，它在$|z-a|< R$内与$f(z)$恒等，而在$C$上处处解析。

我们可立即得到一个确定收敛半径$R$的方法:设$f(z)$在点$a$解析，$b$是$f(z)$的奇点中距$a$最近的一个奇点，则$|b-a|=R$即为$f(z)$在点$a$的邻域内的幂级数展式$\displaystyle\sum_{n=0}^{\infty}c_n(z-a)^n$的收敛半径。

#### 一些初等函数的泰勒展式

函数$f(z)$在$z$平面上解析，它在$z=0$处的展开式是:
$$
\begin{aligned}
e^z&=1+z+\displaystyle\frac{z^2}{2!}+\cdots+\frac{z^n}{n!}+\cdots\,(|z|<+\infty)\\
\cos z&=\displaystyle\frac{e^{iz}+e^{-iz}}{2}=\frac{1}{2}\displaystyle\sum_{n=0}^{\infty}\frac{(iz)^n}{n!}+\frac{1}{2}\displaystyle\sum_{n=0}^{\infty}\frac{(-iz)^n}{n!}\\
&=\displaystyle\sum_{n=0}^{\infty}\frac{(-1)^n z^{2n}}{(2n)!}\,(|z|<+\infty)\\
\sin z&=\displaystyle\sum_{n=0}^{\infty}\frac{(-1)^n z^{2n+1}}{(2n+1)!}\,(|z|<+\infty)\\
(\ln(1+z))_ 0&=z-\frac{z^2}{2}+\frac{z^3}{3}-\cdots+(-1)^{n-1}\frac{z^n}{n}+\cdots\,(|z|<1)\\
(\ln(1+z))_ k&=2k\pi i+z-\frac{z^2}{2}+\frac{z^3}{3}-\cdots+(-1)^{n-1}\frac{z^n}{n}+\cdots\,(|z|<1;k=0,\pm1,\pm2,\cdots)\\
(1+z)^{\alpha}&=e^{\alpha \text{Ln}(1+z)}(\alpha\in \mathbb{C})\\
&=1+\alpha z+\frac{\alpha(\alpha-1)}{2!}z^2+\cdots+\frac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}z^n+\cdots\,(|z|<1)\\
\sqrt[]{z+i}&=\frac{1+i}{\sqrt[]{2}}\left(1-\frac{i}{2}z-\displaystyle\sum_{n=2}^{\infty}\frac{1\cdot3\cdots(2n-3)}{2\cdot4\cdots(2n)}i^nz^n\right).\\
e^z\cos z&=1+\sqrt[]{2}\cos \frac{\pi}{4}z+\displaystyle\sum_{n=2}^{\infty}\displaystyle\frac{(\sqrt[]{2})^n\cos \displaystyle\frac{n\pi}{4}}{n!}z^n=1+\displaystyle\sum_{n=1}^{\infty}\displaystyle\frac{(\sqrt[]{2})^n\cos \displaystyle\frac{n\pi}{4}}{n!}z^n(|z|<+\infty)\\
e^z\sin z&=\sqrt[]{2}\sin \frac{\pi}{4}z+\displaystyle\sum_{n=2}^{\infty}\displaystyle\frac{(\sqrt[]{2})^n\sin \displaystyle\frac{n\pi}{4}}{n!}z^n=\displaystyle\sum_{n=1}^{\infty}\displaystyle\frac{(\sqrt[]{2})^n\sin \displaystyle\frac{n\pi}{4}}{n!}z^n(|z|<+\infty).
\end{aligned}
$$

#### 解析函数零点的存在性和唯一性定理

如果在$|z-a|< R$内，解析函数$f(z)$不恒为零，我们将$f(z)$在点$a$展开成幂级数，此时，幂级数的系数必不全为零。故必有一正整数$m$，使得
$$
f(a)=f'(a)=\cdots=f^{(m-1)}(a)=0,f^{(m)}\neq 0.
$$
满足上述条件的$m$称为零点$a$的阶，$a$称为$f(z)$的$m$阶零点。特别是当$m=1$时，$a$称为$f(z)$的单零点。

不恒为零的解析函数$f(z)$以$a$为$m$阶零点的充要条件为
$$
f(z)=(z-a)^m\varphi(z).
$$
其中$\varphi(z)$在点$a$的邻域$|z-a|< R$内解析，且$\varphi(a)\neq0$。

如在$|z-a|< R$内的解析函数$f(z)$不恒为零，$a$为其零点，则必有$a$的一个邻域，使得$f(z)$在其中无异与$a$的零点。<br>
简单来说就是:不恒为零的解析函数的零点必是孤立的。零点不会形成聚点。

设<br>
(1)函数$f(z)$在邻域$K:|z-a|< R$内解析;<br>
(2)在$K$内有$f(z)$的一列零点${z_n}(z_n\neq a)$收敛于$a$。<br>
则$f(z)$在$K$内必恒为零。

设<br>
(1)函数$f_1(z)$和$f_2(z)$在区域$D$内解析;<br>
(2)$D$内有一个收敛于$a\in D$的点列${z_n}(z_n\neq a)$，在其上$f_1(z)$和$f_2(z)$等值;<br>
则$f_1(z)$和$f_2(z)$在$D$内恒等。

一切在实轴上成立的恒等式($\sin^2 z+\cos^2 z=1,\sin 2z=2\sin z\cdot\cos z$等)，在$z$平面上也成立，只要这个恒等式的等号两边在$z$平面上都是解析的。

#### 最大模原理

设函数$f(z)$在区域$D$内解析，则$|f(z)|$在$D$内任何点都不能达到最大值，除非在$D$内$f(z)$恒等于常数。

设<br>
(1)函数$f(z)$在有界区域$D$内解析，在闭域$\bar{D}=D+\partial D$上连续;<br>
(2)$|f(z)|\leqslant M$;<br>
则除$f(z)$为常数的情形外，$|f(z)|< M(z\in D)$。

最大模原理指出，解析函数在区域边界上的最大模可以限制区域内的最大模。也就是说，解析函数的最大模只能在边界上取到。

#### 洛朗(Laurent)级数

双边幂级数$\displaystyle\sum_{n=-\infty}^{\infty}c_n(z-a)^n$:可以表示成以下两个幂级数之和<br>
正幂项级数:$c_0+c_1(z-a)+c_2(z-a)^2+\cdots$<br>
负幂项级数:$\displaystyle\frac{c_{-1}}{z-a}+\displaystyle\frac{c_{-2}}{(z-a)^2}+\cdots$

设双边幂级数$\displaystyle\sum_{n=-\infty}^{\infty}c_n(z-a)^n$的收敛圆环为$H:r< |z-a|< R\,(r\geqslant0,R\leqslant+\infty).$则<br>
(1)$\displaystyle\sum_{n=-\infty}^{\infty}c_n(z-a)^n$在$H$内绝对收敛且内闭一致收敛于$f(z)=f_1(z)+f_2(z)$.<br>
(2)函数$f(z)$在$H$内解析.<br>
(3)函数$f(z)=\displaystyle\sum_{n=-\infty}^{\infty}c_n(z-a)^n$在$H$内可逐项求导$p$次($p=1,2,\cdots$).<br>
(4)函数$f(z)$可沿$H$内曲线$C$逐项积分。

洛朗定理:在圆环$H:r< |z-a|< R(r\geqslant0,R\leqslant+\infty)$内解析的函数$f(z)$必可展开成双边幂级数
$$
f(z)=\displaystyle\sum_{n=-\infty}^{\infty}c_n(z-a)^n
$$
其中
$$
c_n=\displaystyle\frac{1}{2\pi i}\displaystyle\int_{\Gamma}^{}\displaystyle\frac{f(\zeta)}{(\zeta-a)^{n+1}}\text{d}\zeta(n=0,\pm1,\cdots)
$$
$\Gamma$为圆周$|\zeta-a|=\rho(r<\rho< R)$，并且展式是唯一的(即$f(z)$及圆环$H$唯一地决定了系数$c_n$)。

洛朗级数与泰勒级数的关系:当已给函数$f(z)$在点$a$处解析时，中心在$a$，半径等于由$a$到函数$f(z)$的最近奇点的距离的那个圆可以看成是圆环的特殊情形，在其中就可以作出洛朗展开式。<br>
根据柯西积分定理，由公式$c_n=\displaystyle\frac{1}{2\pi i}\displaystyle\int_{\Gamma}^{}\displaystyle\frac{f(\zeta)}{(\zeta-a)^{n+1}}\text{d}\zeta$可以看出，这个展开式的所有系数$c_{-n}(n=1,2,\cdots)$都等于零。因此，泰勒级数是洛朗级数的特殊情形。

### 解析函数的孤立奇点

如果函数$f(z)$在点$a$的某一去心邻域$K-\{a\}:0<|z-a|< R$(即除去圆心$a$的某圆)内解析，点$a$是$f(z)$的奇点，则称$a$为$f(z)$的一个孤立奇点。

因函数$f(z)$在$K-\{a\}$内是单值的，故也称$a$为$f(z)$的单值性孤立奇点。如果以后遇到$f(z)$在$K-\{a\}$内是多值的，则称$a$为$f(z)$的多值性孤立奇点，即支点(由于在支点的邻域内函数能由一支变到另一支，故函数在支点邻域内缺少单值性。因而它以最简单的方式破坏了函数的解析性。因此支点也是函数的奇点).

如果$a$为函数$f(z)$的一个孤立奇点，则必存在正数$R$，使得$f(z)$在点$a$的去心邻域$K-\{a\}:0<|z-a|< R$内可展开成洛朗级数。

以后提到孤立奇点总指的是单值性孤立奇点。

#### 孤立奇点的三种类型

我们称非负幂部分$\displaystyle\sum_{n=0}^{\infty}c_n(z-a)^n$为$f(z)$在点$a$的正则部分.

称负幂部分$\displaystyle\sum_{n=1}^{\infty}c_{-n}(z-a)^{-n}$为$f(z)$在点$a$的主要部分.

这实际上是因为非负幂部分表示在点$a$的邻域$K:|z-a|< R$内的解析函数，故函数$f(z)$在点$a$的奇异性质完全体现在洛朗级数的负幂部分。

设$a$为函数$f(z)$的孤立奇点。<br>
(1)如果$f(z)$在点$a$的主要部分为零，则称$a$为$f(z)$的可去奇点.<br>
(2)如果$f(z)$在点$a$的主要部分为有限多项，设为
$$
\displaystyle\frac{c_{-m}}{(z-a)^m}+\displaystyle\frac{c_{-(m-1)}}{(z-a)^{m-1}}+\cdots+\displaystyle\frac{c_{-1}}{z-a}(c_{-m}\neq0)
$$
则称$a$为$f(z)$的$m$阶极点.一阶极点也称为单极点。<br>
如果$f(z)$在点$a$的主要部分有无限多项，则称$a$为$f(z)$的本质奇点。

可去奇点的等价特征：<br>
(1)$f(z)$在点$a$的主要部分为零。<br>
(2)$\displaystyle\lim_{z\to a}f(z)=b(\neq\infty)$存在且有限。<br>
(3)$f(z)$在点$a$的某去心邻域内有界。

施瓦茨(Schwarz)引理：如果函数$f(z)$在单位圆$|z|< 1$内解析，并且满足条件$f(0)=0,|f(z)|<1(|z|<1)$，则在单位圆$|z|<1$内恒有$|f(z)|\leqslant|z|$，且有$|f'(0)|\leqslant1$。<br>
如果上述等号成立，或在圆$|z|<1$内一点$z_0\neq0$处前一式等号成立，则(当且仅当)$f(z)=e^{i\alpha}z(|z|<1)$，其中$\alpha$为一实常数。

极点的等价特征：<br>
(1)$f(z)$在点$a$的主要部分为有限多项$\displaystyle\frac{c_{-m}}{(z-a)^{m}}+\cdots+\displaystyle\frac{c_{-1}}{z-a}(c_{-m}\neq0)$。<br>
(2)$f(z)$在点$a$的某去心邻域内能表成$f(z)=\displaystyle\frac{\lambda(z)}{(z-a)^m}$，其中$\lambda(z)$在点$a$邻域内解析，且$\lambda(a)\neq0$。<br>
(3)$g(z)=\displaystyle\frac{1}{f(z)}$以点$a$为$m$阶零点(可去奇点要当作解析点看待，只要令$g(a)=0$)。<br>
(4)极限$\displaystyle\lim_{z\to a}f(z)=\infty$为无穷。

极点的判断方法：<br>
极限法：如果函数$f(z)$在$z_0$某个去心邻域内解析，且满足$\displaystyle\lim_{z\to z_0}(z-z_0)^mf(z)=A\neq0$，而对于$k< m$，有$\displaystyle\lim_{z\to z_0}(z-z_0)^kf(z)=\infty$。则$z_0$是$f(z)$的$m$阶极点。<br>
分式法：如果函数$f(z)$可以表示为$\displaystyle\frac{g(z)}{h(z)}$，其中$g(z)$和$h(z)$在$z_0$解析，且$g(z_0)\neq0$，而$h(z)$在$z_0$有$m$阶零点，即$h(z_0)=h'(z_0)=\cdots=h^{(m-1)}(z_0)=0$但$h^{(m)}(z_0)\neq0$，则$z_0$是$f(z)$的$m$阶极点。<br>
导数法：计算导数$\displaystyle \text{Res}(f,z_0)=\displaystyle\frac{1}{(m-1)!}\displaystyle\lim_{z\to z_0}\displaystyle\frac{\text{d}^{m-1}}{\text{d}z^{m-1}}[(z-z_0)^mf(z)]\neq0$，若$m=1$，只需计算$\displaystyle\lim_{z\to z_0}(z-z_0)f(z)$。若$m >1$，则需要对$(z-z_0)^mf(z)$求$m-1$阶导数后计算极限。<br>
积分判断法：如果$f(z)$在$z_0$某个去心邻域内解析，且对于$k=1,2,\cdots,m-1$，有$\displaystyle\oint_{C}^{}(z-z_0)^kf(z)\text{d}z=0$，而$\displaystyle\oint_{C}^{}(z-z_0)^mf(z)\neq0$，其中$C$是包含$z_0$的简单闭曲线，则$z_0$是$f(z)$的$m$阶极点。

本质奇点(本性奇点)的充要条件：<br>
(1)$\displaystyle\lim_{z\to a}f(z)\neq\begin{cases}
b, &\text{有限数}\\
\infty
\end{cases}$即极限$\displaystyle\lim_{z\to a}f(z)$不存在。<br>
(2)主要部分有无穷多项负幂。

皮卡(Picard)小定理:如果$a$为函数$f(z)$的本质奇点，则对于任何常数$A$,不管它是有限数还是无穷，都有一收敛于$a$的点列$\{z_n\}$，使得$\displaystyle\lim_{z_n\to a}f(z_n)=A$。<br>
皮卡大定理:如果$a$为函数$f(z)$的本质奇点，则对于每一个$A\neq\infty$，除掉可能一个值$A=A_0$外，必有趋于$a$的无限点列$\{z_n\}$，使$f(z_n)=A(n=1,2,\cdots)$。<br>
换句话说,<br>
小皮卡定理：若$z_0$是$f(z)$的本性奇点，则在任意小的去心邻域内，$f(z)$取遍所有复数值，最多可能有一个例外值。<br>
大皮卡定理：在整个复平面上，超越整函数（如$e^z$在无穷远点（本性奇点）附近也满足类似性质。

皮卡定理描述解析函数在本质奇点邻域内的特性。

解析函数在无穷远点的性质：$\infty$点总是$f(z)$的奇点。<br>
设函数$f(z)$在无穷远点(去心)邻域$N-\{\infty\}:+\infty>|z|>r\geqslant0$内解析，则称点$\infty$为$f(z)$的一个孤立奇点。

#### 整函数与亚纯函数

在整个$z$平面上解析的函数称为整函数。

若$f(z)$为一整函数，则只以$\infty$为孤立奇点。<br>
(1)$z=\infty$为$f(z)$的可去奇点的充要条件为：$f(z)=$常数$c_0$。<br>
(2)$z=\infty$为$f(z)$的$m$阶极点的充要条件为：$f(z)$是一个$m$次多项式$c_0+c_1z+\cdots+c_mz^m(c_m\neq0)$。<br>
(3)$z=\infty$为$f(z)$的本质奇点的充要条件为：展开式有无穷多个$c_n$不等于零(我们称这样的$f(z)$为超越整函数)。

在$z$平面上除极点外无其他类型奇点的单值解析函数称为亚纯函数。

一函数$f(z)$为有理函数的充要条件为：$f(z)$在扩充$z$平面上除极点外没有其他类型的奇点。

非有理函数的亚纯函数称为超越亚纯函数。

### 留数定理

#### 留数:

设函数$f(z)$以有限点$a$为孤立奇点，即$f(z)$在点$a$的某去心邻域$0<|z-a|< R$内解析，则称积分
$$
\displaystyle\frac{1}{2\pi i}\displaystyle\int_{\Gamma}^{}f(z)\text{d}z(\Gamma:|z-a|=\rho,0<\rho< R)
$$
为$f(z)$在点$a$的留数(residue)，记为$\underset{z=a}{\text{Res}} f(z)$。

利用洛朗系数关系可以知道$\displaystyle\frac{1}{2\pi i}\displaystyle\int_{\Gamma}^{}f(z)\text{d}z=c_{-1}$，即$\underset{z=a}{\text{Res}}f(z)=c_{-1}$，这里$c_{-1}$是$f(z)$在$z=a$处的洛朗展开式中$\displaystyle\frac{1}{z-a}$这一项的系数。

故而，函数在有限可去奇点处的留数为零。

#### 柯西留数定理

$f(z)$在周线或复周线$C$所围的区域$D$内，除$a_1,a_2,\cdots,a_n$外解析，在闭域$\bar{D}=D+C$上除$a_1,a_2,\cdots,a_n$外连续，则("大范围"积分)
$$
\displaystyle\int_{C}^{}f(z)\text{d}z=2\pi i \displaystyle\sum_{k=1}^{n}\underset{z=a_k}{\text{Res}}f(z).
$$

#### 留数的求法

由于留数就是洛朗展开式中$\displaystyle\frac{1}{z-a}$这一项的系数，所以应用洛朗展开式是一般方法。

(1)可去奇点<br>
可去奇点的留数一定是0.

(2)$m$阶极点<br>
设$a$为$f(z)$的$n$阶极点,$f(z)=\displaystyle\frac{\varphi(z)}{(z-a)^n}$,其中$\varphi(z)$在点$a$解析，$\varphi(a)\neq0$，则$\underset{z=a}{\text{Res}}f(z)=\displaystyle\frac{\varphi^{(n-1)}(a)}{(n-1)!}$。这里符号$\varphi^{(0)}(a)$代表，且有$\varphi^{(n-1)}(a)=\displaystyle\lim_{z\to a}\varphi^{(n-1)}(z)$。

有用的推论：<br>
设$a$为$f(z)$的一阶极点，$\varphi(z)=(z-a)f(z)$,则$\underset{z=a}{\text{Res}}f(z)=\varphi(a)$。<br>
设$a$为$f(z)$的二阶极点，$\varphi(z)=(z-a)^2f(z)$,则$\underset{z=a}{\text{Res}}f(z)=\varphi'(a)$。<br>
设$a$为$f(z)=\displaystyle\frac{\varphi(z)}{\psi(z)}$的一阶极点(只要$\varphi(z)$及$\psi(z)$在点$a$解析，且$\varphi(a)\neq0,\psi(a)=0,\psi'(a)\neq0$)，则$\underset{z=a}{\text{Res}}f(z)=\displaystyle\frac{\varphi(a)}{\psi'(a)}$。

(3)本性奇点<br>
由于函数在本性奇点的洛朗展开式有无穷多项，所以无法通过求导化简求留数的方法，故而求本性奇点留数的方法几乎只有去寻找洛朗展开式，并将$c_{-1}$项找出来。

#### 函数在无穷远点的留数

设$\infty$为函数$f(z)$的一个孤立奇点，即$f(z)$在去心邻域$N-\{\infty\}:0\leqslant r< |z|< +\infty$内解析，则称$\displaystyle\frac{1}{2\pi i}\displaystyle\int_{\Gamma^-}^{}f(z)\text{d}z(\Gamma:|z|=\rho > r)$为$f(z)$在点$\infty$的留数，记为$\underset{z=\infty}{\text{Res}}f(z)$，这里$\Gamma^-$是指顺时针方向(这个方向很自然地可以看作是绕无穷远点的正向)。

无穷远点留数的计算：
设$f(z)$在$0\leqslant r< |z|< +\infty$内的洛朗展开式为
$$
f(z)=\cdots+\displaystyle\frac{c_{-n}}{z^n}+\cdots+\displaystyle\frac{c_{-1}}{z}+c_0+c_1z+\cdots+c_nz^n+\cdots,
$$
则
$$
\underset{z=\infty}{\text{Res}}f(z)=\displaystyle\frac{1}{2\pi i}\displaystyle\int_{\Gamma^-}^{}f(z)\text{d}z=-c_{-1}
$$
也就是说，$\underset{z=\infty}{\text{Res}}f(z)$等于$f(z)$在点$\infty$的洛朗展开式中$\displaystyle\frac{1}{z}$这一项的系数反号。<br>
同样也有：$\underset{z=\infty}{\text{Res}}f(z)=-\underset{t=0}{\text{Res}}\left[f \left(\displaystyle\frac{1}{t}\right)\displaystyle\frac{1}{t^2}\right]$.

留数零和定理：如果函数$f(z)$在扩充$z$平面上只有有限个孤立奇点(包括无穷远点在内)，设为$a_1,a_2,\cdots,a_n,\infty$，则$f(z)$在各点的留数总和为零。

特别注意：虽然在$f(z)$的有限可去奇点$a$处，必有$\underset{z=a}{\text{Res}}f(z)=0$，但是，如果点$\infty$为$f(z)$的可去奇点(或解析点)，则$\underset{z=\infty}{\text{Res}}f(z)$可以不是零。<br>
例如，$f(z)=2+\displaystyle\frac{1}{z}$以$z=\infty$为可去奇点，但$\underset{z=\infty}{\text{Res}}f(z)=-1$。

#### 用留数定理计算实积分

(1)$\displaystyle\int_{0}^{2\pi}R(\cos\theta,\sin\theta)\text{d}\theta$

这里$R(\cos\theta,\sin\theta)$表示$\cos\theta,\sin\theta$的有理函数，并且在$[0,2\pi]$上连续。若令$z=e^{i\theta}$，则
$$
\cos\theta=\displaystyle\frac{z+z^{-1}}{2},\sin\theta=\displaystyle\frac{z-z^{-1}}{2i},\text{d}\theta=\displaystyle\frac{\text{d}z}{iz}.
$$
当$\theta$经历变程$[0,2\pi]$时，$z$沿圆周$|z|=1$的正方向绕行一周。因此有
$$
\displaystyle\int_{0}^{2\pi}R(\cos\theta,\sin\theta)\text{d}\theta=\displaystyle\int_{|z|=1}^{}R \left(\displaystyle\frac{z+z^{-1}}{2},\displaystyle\frac{z-z^{-1}}{2i}\right)\displaystyle\frac{\text{d}z}{iz}.
$$
右端是$z$的有理函数的周线积分，并且积分路径上无奇点，应用留数定理可以简单求得其值。

(2)$\displaystyle\int_{-\infty}^{+\infty}R(x)\text{d}x=\displaystyle\int_{-\infty}^{+\infty}\displaystyle\frac{P(x)}{Q(x)}\text{d}x$

为了计算这种反常积分，我们需要一个引理：设$f(z)$沿圆弧$S_R:z=Re^{i\theta}(\theta_1\leqslant\theta\leqslant\theta_2)$，($R$充分大)上连续，且$\displaystyle\lim_{R\to+\infty}zf(z)=\lambda$于$S_R$上一致成立(即与$\theta_1\leqslant\theta\leqslant\theta_2$中的$\theta$无关)，则
$$
\displaystyle\lim_{R\to+\infty}\displaystyle\int_{S_R}^{}f(z)\text{d}z=i(\theta_2-\theta_1)\lambda.
$$

定理：设$f(z)=\displaystyle\frac{P(z)}{Q(z)}$为有理分式，其中$P(z)=c_0z^m+c_1z^{m-1}+\cdots+c_m(c_0\neq0)$与$Q(z)=b_0z^n+b_1z^{n-1}+\cdots+b_n(b_0\neq0)$为互质多项式，且符合条件：<br>
(1)$n-m\geqslant2$，<br>
(2)在实轴上$Q(z)\neq0$。<br>
于是有
$$
\displaystyle\int_{-\infty}^{+\infty}f(x)\text{d}x=2\pi i \displaystyle\sum_{\text{Im}a_k>0}^{}\underset{z=a_k}{\text{Res}}f(z).
$$

(3)$\displaystyle\int_{-\infty}^{+\infty}R(x)e^{imx}\text{d}x=\displaystyle\int_{-\infty}^{+\infty}\displaystyle\frac{P(x)}{Q(x)}e^{imx}\text{d}x$

若尔当引理：设函数$g(z)$沿半圆周$\Gamma_R:z=Re^{i\theta}(0\leqslant\theta\leqslant\pi)$,($R$充分大)上连续，且$\displaystyle\lim_{R\to+\infty}g(z)=0$在上一致成立，则
$$
\displaystyle\lim_{R\to+\infty}\displaystyle\int_{\Gamma_R}^{}g(z)e^{imz}\text{d}z=0(m>0).
$$

定理：设$g(z)=\displaystyle\frac{P(z)}{Q(z)}$，其中$P(z)$及$Q(z)$是互质多项式，且符合条件：<br>
(1)$Q(z)$的次数比$P(z)$的次数高，<br>
(2)在实轴上$Q(z)\neq0$，<br>
(3)$m >0$<br>
则有
$$
\displaystyle\int_{-\infty}^{+\infty}g(x)e^{imx}\text{d}x=2\pi i \displaystyle\sum_{\text{Im}a_k>0}^{}\underset{z=a_k}{\text{Res}}[g(z)e^{imz}].
$$
特别来说，将$\displaystyle\int_{-\infty}^{+\infty}g(x)e^{imx}\text{d}x$分开实虚部，就可以得到形如
$$
\displaystyle\int_{-\infty}^{+\infty}\displaystyle\frac{P(x)}{Q(x)}\cos mx \text{d}x,\,\,\displaystyle\int_{-\infty}^{+\infty}\displaystyle\frac{P(x)}{Q(x)}\sin mx \text{d}x.
$$
的积分。由数学分析的结论，可知上面两个反常积分都存在，其值就等于其柯西主值。

(4)积分路径上有奇点的积分

现在，我们可以把条件放宽一点，容许$Q(z)$有有限多个一阶零点，即允许函数$f(z)=\displaystyle\frac{P(z)}{Q(z)}e^{imz}$在实轴上有有限个一阶极点。<br>
引理：设$f(z)$沿圆弧$S_r:z-a=re^{i\theta}(\theta_1\leqslant\theta\leqslant\theta_2)$,($r$充分小)上连续，且$\displaystyle\lim_{r\to0}(z-a)f(z)=\lambda$于$S_r$上一致成立，则有
$$
\displaystyle\lim_{r\to0}\displaystyle\int_{S_r}^{}f(z)\text{d}z=i(\theta_2-\theta_1)\lambda.
$$

(5)使用泊松(Poisson)积分$\displaystyle\int_{0}^{+\infty}e^{-t^2}\text{d}t=\displaystyle\frac{\sqrt[]{\pi}}{2}$计算非涅耳(Fresnel)积分
$$
\displaystyle\int_{0}^{+\infty}\cos x^2 \text{d}x,\,\,\displaystyle\int_{0}^{+\infty}\sin x^2 \text{d}x.
$$

证明：<br>
考察辅助函数$f(z)=e^{-z^2}$，它是一个整函数。<br>
取辅助积分路径$C_R(\theta\in[0,\displaystyle\frac{\pi}{4}],r\in[0,R])$.(八分之一圆周与两个半径围成的边界)。
$$
\begin{align}
0&=\displaystyle\int_{C_R}^{}e^{-z^2}\text{d}z\\
&=\displaystyle\int_{0}^{R}e^{-x^2}\text{d}x+\displaystyle\int_{\Gamma_R}^{}e^{-z^2}\text{d}z+\displaystyle\int_{0}^{R}e^{-x^2e^{\frac{\pi}{2}i}}e^{\frac{\pi}{4}i}\text{d}x.\tag{6.17}
\end{align}
$$
而
$$
\begin{align}
\left|\displaystyle\int_{\Gamma_R}^{}e^{-z^2}\text{d}z\right|&=\left|\displaystyle\int_{0}^{\frac{\pi}{4}}e^{-R^2(\cos2\varphi+i\sin2\varphi)}iRe^{i\varphi}\text{d}\varphi\right|\\
&\leqslant \displaystyle\int_{0}^{\frac{\pi}{4}}e^{-R^2\cos2\varphi}R \text{d}\varphi\\
&\overset{2\varphi=\frac{\pi}{2}-\theta}{=}\displaystyle\frac{R}{2}\displaystyle\int_{0}^{\frac{\pi}{2}}e^{-R^2\sin\theta}\text{d}\theta\\
&\overset{\text{若尔当不等式}}{\leqslant}\displaystyle\frac{R}{2}\displaystyle\int_{0}^{\frac{\pi}{2}}e^{-R^2\cdot \frac{2\theta}{\pi}}\text{d}\theta\\
&=-\displaystyle\frac{R}{2}\cdot \displaystyle\frac{\pi}{2R^2}e^{-\frac{2R^2}{\pi}\theta}|_ {\theta=0}^{\theta=\frac{\pi}{2}}=\displaystyle\frac{\pi}{4R}[1-e^{-R^2}].
\end{align}
$$
故当$R\to+\infty$时，$\left|\displaystyle\int_{\Gamma_R}^{}e^{-z^2}\text{d}z\right|\to0$<br>
于是当$R\to+\infty$时，(6.17)变成
$$
\displaystyle\frac{1+i}{\sqrt[]{2}}\displaystyle\int_{0}^{+\infty}(\cos x^2-i\sin x^2)\text{d}x=\displaystyle\int_{0}^{+\infty}e^{-x^2}\text{d}x=\displaystyle\frac{\sqrt[]{\pi}}{2}.
$$
即
$$
\displaystyle\int_{0}^{+\infty}(\cos x^2-i\sin x^2)\text{d}x=\displaystyle\frac{1}{2}\sqrt[]{\displaystyle\frac{\pi}{2}}(1-i).
$$
比较两端实部与虚部，即得
$$
\displaystyle\int_{0}^{+\infty}\cos x^2 \text{d}x=\displaystyle\int_{0}^{+\infty}\sin x^2 \text{d}x=\displaystyle\frac{1}{2}\sqrt[]{\displaystyle\frac{\pi}{2}}.
$$

(6)应用多值函数的积分

被积函数或辅助函数是多值解析函数的情形，一定要适当割开平面，使其能分出单值解析分支，才能应用柯西积分定理或柯西留数定理来求出给定的积分的值。

#### 辐角原理及其应用

对数留数(名称来源于$\displaystyle\frac{f'(z)}{f(z)}=\displaystyle\frac{\text{d}}{\text{d}z}[\ln f(z)]$)
$$
\displaystyle\frac{1}{2\pi i}\displaystyle\int_{C}^{}\displaystyle\frac{f'(z)}{f(z)}\text{d}z.
$$
显然，函数$f(z)$的零点和奇点都可能是$\displaystyle\frac{f'(z)}{f(z)}$的奇点。

引理：<br>
(1)设$a$为$f(z)$的$n$阶零点，则$a$必为函数$\displaystyle\frac{f'(z)}{f(z)}$的一阶极点，并且
$$
\underset{z=a}{\text{Res}}\left[\displaystyle\frac{f'(z)}{f(z)}\right]=n.
$$
(2)设$b$为$f(z)$的$m$阶极点，则$b$必为函数$\displaystyle\frac{f'(z)}{f(z)}$的一阶极点，并且
$$
\underset{z=a}{\text{Res}}\left[\displaystyle\frac{f'(z)}{f(z)}\right]=-m.
$$

定理:<br>
设$C$是一条周线，$f(z)$符合条件：<br>
(1)$f(z)$在$C$的内部是亚纯的，<br>
(2)$f(z)$在$C$上解析且不为零。<br>
则有
$$
\displaystyle\frac{1}{2\pi i}\displaystyle\int_{C}^{}\displaystyle\frac{f'(z)}{f(z)}\text{d}z=N(f,C)-P(f,C).
$$
式中$N(f,C)$与$P(f,C)$分别表示$f(z)$在$C$内部的零点与极点的个数(一个$n$阶零点算作$n$个零点，一个$m$阶极点算作$m$个极点)。

辐角原理：<br>
设$C$是一条周线，$f(z)$符合条件：<br>
(1)$f(z)$在$C$的内部是亚纯的，<br>
(2)$f(z)$在$C$上解析且不为零。<br>
则有$f(z)$在周线$C$内部的零点个数与极点个数之差，等于当$z$沿$C$之正向绕行一周后$\arg f(z)$的改变量$\Delta_C\arg f(z)$除以$2\pi$，即
$$
N(f,C)-P(f,C)=\displaystyle\frac{\Delta_C\arg f(z)}{2\pi}.
$$
特别来说，如$f(z)$在周线$C$上及$C$之内部均解析，且$f(z)$在$C$上不为零，则
$$
N(f,C)=\displaystyle\frac{\Delta_C\arg f(z)}{2\pi}.
$$

鲁歇(Rouche)定理<br>
设$C$是一条周线，函数$f(z)$及$\varphi(z)$满足条件：<br>
(1)它们在$C$的内部均解析，且连续到$C$，<br>
(2)在$C$上,$|f(z)| > |\varphi(z)|$，<br>
则函数$f(z)$与$f(z)+\varphi(z)$在$C$的内部有同样多(几阶算作几个)的零点，即
$$
N(f+\varphi,C)=N(f,C).
$$

单叶解析函数的一个重要性质。<br>
若函数$f(z)$在区域$D$内单叶解析，则在$D$内$f'(z)\neq0$。

### 共形映射

#### 解析变换的特性

保域定理：<br>
设$w=f(z)$在区域$D$内解析且不恒为常数，则$D$的像$G=f(D)$也是一个区域。

推论<br>
设$w=f(z)$在区域$D$内单叶解析，则$D$的像$G=f(D)$也是一个区域。

定理<br>
设函数$w=f(z)$在点$z_0$解析，且$f'(z_0)\neq0$，则$f(z)$在$z_0$的一个邻域内单叶解析。

##### 解析变换的保角性

保角性是解析函数的局部性质，反映了复变函数在导数非零点处的“刚性”变换特性。

导数辐角的几何意义：<br>
像曲线$\Gamma$在点$w_0=f(z_0)$的切线正向，可由原像曲线$C$在点$z_0$的切线正向旋转一个角$\arg f'(z_0)$得出。$\arg f'(z_0)$仅与$z_0$有关，而与过$z_0$的曲线$C$的选择无关，称为变换$w=f(z)$在点$z_0$的旋转角。这也就是导数辐角的几何意义。<br>
像点间的无穷小距离与原像点间的无穷小距离之比的极限是$\displaystyle\lim_{\Delta z\to0}\left|\displaystyle\frac{\Delta w}{\Delta z}\right|=R=|f'(z_0)|$，它仅与$z_0$有关，而与过$z_0$的曲线$C$之方向无关。称为变换$w=f(z)$在点$z_0$的伸缩率。这也就是导数模的几何意义。

解析函数在导数不为零的地方具有旋转角不变性和伸缩率不变性。

定义：<br>
经点$z_0$的两条有向曲线$C_1,C_2$的切线方向所构成的角，称为两曲线在该点的夹角。

定义：<br>
若函数$w=f(z)$在点$z_0$的邻域内有定义，且在点$z_0$具有：<br>
(1)伸缩率不变性，<br>
(2)过$z_0$的任意两条曲线的夹角在变换$w=f(z)$下，既保持大小，又保持方向。<br>
则称函数$w=f(z)$在点$z_0$是保角的，或称$w=f(z)$在点$z_0$处是保角变换。如果在区域$D$内处处都是保角的，则称$w=f(z)$在区域$D$内是保角的，或称$w=f(z)$在区域$D$内是保角变换。

定理：<br>
如$w=f(z)$在区域$D$内解析，则它在导数不为零的点处是保角的。

推论：<br>
如$w=f(z)$在区域$D$内单叶解析，则$w=f(z)$在$D$内是保角的。

##### 单叶解析变换的共形性

定义：<br>
如果$w=f(z)$在区域$D$内是单叶且保角的，则称此变换$w=f(z)$在$D$内是共形的，也称它为$D$内的共形映射。

注：<br>
解析变换$w=f(z)$在解析点$z_0$如有$f'(z_0)\neq0$(由$f'(z)$在$z_0$的连续性，必在$z_0$的邻域内$\neq0$)，于是$w=f(z)$在点$z_0$保角，因而在$z_0$的邻域内单叶保角，从而在$z_0$的邻域内共形(局部)。在区域$D$内$w=f(z)$(整体)共形，必然在$D$内处处(局部)共形，但反过来不必真。

定理：<br>
设$w=f(z)$在区域$D$内单叶解析，则<br>
(1)$w=f(z)$将$D$共形映射成区域$G=f(D)$。<br>
(2)反函数$z=f^{-1}(w)$在区域$G$内单叶解析，且
$$
f^{-1}(w_0)=\displaystyle\frac{1}{f'(z_0)}\,(z_0\in D,w_0=f(z_0)\in G).
$$

#### 分式线性变换

##### 分式线性变换及其分解

$w=\displaystyle\frac{az+b}{cz+d},\begin{vmatrix}
a & b \\
c & d
\end{vmatrix}=ad-bc\neq0$称为分式线性变换。简记为$w=L(z)$。

注：分式线性变换又被称为默比乌斯变换。<br>
条件$ad-bc\neq0$是必要的，否则将导致$L(z)$恒为常数。<br>
此外，我们将在扩充$z$平面行加以如下的补充定义：<br>
如$c\neq0$，在$z=-\displaystyle\frac{d}{c}$处定义$w=\infty$，在$z=\infty$处定义$w=\displaystyle\frac{a}{c}$。<br>
如$c=0$,在$z=\infty$处定义$w=\infty$。<br>
这样，我们总认为分式线性变换是定义在整个扩充复平面上的。<br>
分式线性变换在扩充$z$平面上是保域的。但在一般的复平面上不一定保域，或者说不一定保单连通性。

分式线性变换总可以分解成下列简单类型变换的复合：<br>
($I$)$w=kz+h\,(k\neq0)$，<br>
($II$)$w=\displaystyle\frac{1}{z}$。

($I$)型变换$w=kz+h(k\neq0)$可称为整线性变换。如果$k=\rho e^{i\alpha}(\rho >0,\alpha\in\mathbb{R})$，则$w=\rho e^{i\alpha}z+h$，由此可见，此变换可以分解成三个更简单的变换：旋转、伸缩和平移。<br>
即是说，在整线性变换下，原像与像相似。不过这种相似不是任意的相似变换，而是不改变图形方向的相似变换(如原像三角形的顶点顺序是逆时针方向的，则其像三角形的顶点顺序也是逆时针方向的)。

($II$)型变换$w=\displaystyle\frac{1}{z}$可称为反演变换。它可以分解为两个更简单的变换的复合：$w=\displaystyle\frac{1}{\bar{z}},w=\bar{\omega}$<br>
前者称为关于单位圆周的对称变换，并称$z$与$w$是关于单位圆周的对称点。后者称为关于实轴的对称变换，并称$w$与$\omega$是关于实轴的对称点。

其次，我们称满足$L(z)=z$的点$z$为分式线性变换的不动点，不动点$z$满足方程$cz^2+(d-a)z-b=0$。<br>
因此，不为恒等变换的分式线性变换至多只有两个不动点，或一个二重不动点。如果一个分式线性变换有三个不动点，则必定为恒等变换。

分式线性变换的复合仍然是分式线性变换。

##### 分式线性变换的性质

(1)共形性<br>
定义：<br>
二曲线在无穷远点处的交角为$\alpha$，就是指它们在反演变换下的像曲线在原点处的交角为$\alpha$。<br>
定理：分式线性变换在扩充$z$平面上是共形的(在无穷远点处不考虑伸缩率的不变性)。

(2)保交比性<br>
定义：<br>
扩充复平面上有顺序的四个相异点$z_1,z_2,z_3,z_4$构成的量$(z_1,z_2,z_3,z_4)$，称为它们的交比记为:$(z_1,z_2,z_3,z_4)=\displaystyle\frac{z_4-z_1}{z_4-z_2}:\displaystyle\frac{z_3-z_1}{z_3-z_2}$.<br>
当四点中有一点为$\infty$时，应将包含此点的项用$1$代替。<br>
定理：<br>
在分式线性变换下，四点的交比不变。<br>
定理：<br>
设分式线性变换将扩充$z$平面上三个相异点$z_1,z_2,z_3$指定变为$w_1,w_2,w_3$，则此分式线性变换就被惟一确定，并且可以写成
$$
\displaystyle\frac{w-w_1}{w-w_2}:\displaystyle\frac{w_3-w_1}{w_3-w_2}=\displaystyle\frac{z-z_1}{z-z_2}:\displaystyle\frac{z_3-z_1}{z_3-z_2}.
$$

(3)保圆周(圆)性<br>
整线性变换，将圆周映射为圆周，直线映射为直线。<br>
反演变换，将圆周或直线映射为圆周或直线。<br>
定理：分式线性变换将平面上的圆周或直线变为圆周或直线。<br>
同时，圆被保形变换成圆。

(4)保对称点性<br>
定义：<br>
$z_1,z_2$关于圆周$\gamma:|z-a|=R$对称是指$z_1,z_2$都在过圆心$a$的同一条射线上，且合$|z_1-a||z_2-a|=R$.<br>
此外，还规定圆心$a$与点$\infty$也是关于$\gamma$对称的。

定理：<br>
扩充$z$平面上两点$z_1,z_2$关于圆周$\gamma$对称的充要条件是，通过$z_1,z_2$的任意圆周都与$\gamma$正交。

定理：<br>
设扩充$z$平面上两点$z_1,z_2$关于圆周$\gamma$对称，$w=L(z)$为一分式线性变换，则$w_1=L(z_1),w_2=L(z_2)$两点关于圆周$\Gamma=L(\gamma)$为对称。

#### 某些初等函数所构成的共形映射

##### 幂函数与根式函数

先讨论幂函数$w=z^n$，其中$n$是大于$1$的自然数。除了$z=0$及$z=\infty$外，它处处具有不为零的导数，因而在这些点总是保角的。<br>
于是幂函数$w=z^n$将角形区域$d:0<\arg z<\alpha \left(0<\alpha\leqslant \displaystyle\frac{2\pi}{n}\right)$共形映射成角形区域$D:0<\arg w< n\alpha$。<br>
特别，$w=z^n$将角形区域$0<\arg z< \displaystyle\frac{2\pi}{n}$共形映射成$w$平面上除去原点及正实轴的区域。

作为$w=z^n$的逆变换$z=\sqrt[n]{w}$，将$w$平面上的角形区域$D:0<\arg z< n\alpha \left(0<\alpha\leqslant \displaystyle\frac{2\pi}{n}\right)$共形映射成$z$平面上的角形区域$d:0<\arg z< \alpha$。(这里$\sqrt[n]{w}$是$D$内的一个单值解析分支，它的值完全由区域$d$确定)。

总之，以后我们要将角形区域的张度拉大或缩小时，就可以利用幂函数或根式函数所构成的共形映射。

##### 指数函数与对数函数

指数函数$w=e^z$在任意有限点均有$(e^z)'\neq0$，因而它在$z$平面上是保角的。<br>
$w=e^z$的单叶性区域是平行于实轴宽不超过$2\pi$的带形区域。例如，指数函数在带形区域$g:0< \text{Im}\,z< h(0< h\leqslant 2\pi)$是单叶的，因而也是共形的($z=\infty$不再$g$内，而在$g$的边界上)。于是指数函数将带形区域$g:0< \text{Im}\,z< h(0< h\leqslant2\pi)$共形映射成角形区域$G:0<\arg w< h$。<br>
特别，$w=e^z$将带形区域$0< \text{Im}\,z<2\pi$共形映射成$w$平面除去原点及正实轴的区域。

作为$w=e^z$的逆变换$z=\ln w$，将$w$平面上的角形区域$G:0<\arg w< h(0< h\leqslant2\pi)$共形映射成$z$平面上的带形区域$g:0< \text{Im}\,z< h$(这里$\ln w$是$G$内的一个单值解析分支，它的值完全由区域$g$确定)。

##### 由圆弧构成的两角形区域的共形映射

借助于分式线性函数，以及幂函数或指数函数的复合，可以将二圆弧或直线段所构成的两角形区域，共形映射成一个标准区域，比如上半平面。

##### 机翼剖面函数及其反函数所构成的共形映射

$z=\displaystyle\frac{1}{2}\left(w+\displaystyle\frac{a^2}{w}\right)$将区域形如机翼剖面共形映射成单位圆，反函数$w=z+\sqrt[]{z^2-a^2}$则反之。<br>
此函数又称为机翼剖面函数或机翼变换，也称为茹科夫斯基变换。

##### 茹科夫斯基函数的单叶性区域

我们首先将它改写成通常形式：
$$
w=\displaystyle\frac{1}{2}\left(z+\displaystyle\frac{1}{z}\right),
$$
这个函数在扩充$z$平面上除$z=0,\infty$外解析，$z=0,\infty$都是它们的一阶极点。

总之，茹科夫斯基函数在$|z|=1$的内部及外部都是单叶的，且将它们都共形映射成扩充平面上去掉割线$-1\leqslant \text{Re}\,w\leqslant1,\text{Im}\,w=0$而得的区域$D_0$。<br>
这样一来，茹科夫斯基函数在区域内就有两个单值反函数，称为单值解析分支。
$$
z=w+\sqrt[]{w^2-1},
$$
它们分别将区域$D_0$共形映射成单位圆周$|z|=1$的内部$|z|<1$及外部$|z|>1$。

#### 关于共形映射的黎曼存在定理和边界对应定理

##### 黎曼存在定理

扩充$z$平面上的单连通区域$D$，其边界点不止一点，则有一个在$D$内的单叶解析函数$w=f(z)$，它将$D$共形映射成单位圆$|w|<1$，且当符合条件$f(a)=0,f'(a)>0(a\in D)$时，这种函数$f(z)$就只有一个。

##### 边界对应定理

设<br>
(1)有界单连通区域$D$与$G$的边界分别为周线$C$与$\Gamma$，<br>
(2)$w=f(z)$将$D$共形映射成$G$，<br>
则$f(z)$可以扩张成$F(z)$，使在$D$内$F(z)=f(z)$，在$\bar{D}=D+C$上$F(z)$连续，并将$C$双方单值且双方连续地变成$\Gamma$。

边界对应定理的逆定理，判断解析函数单叶性的充分条件：<br>
设单连通区域$D$及$G$分别是两条周线$C$及$\Gamma$的内部。且设函数$w=f(z)$满足下列条件：<br>
(1)$w=f(z)$在区域$D$内解析，在$D+C$上连续，<br>
(2)$w=f(z)$将$C$双方单值地变成$\Gamma$，<br>
则(1)$w=f(z)$在$D$内单叶，<br>
(2)$G=f(D)$(从而$w=f(z)$将$D$共形映射成$G$。)

# End
