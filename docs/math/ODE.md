# ODE
### 常微分方程的概念和简单情况概述

一般的$n$阶常微分方程具有形式$F \left(x,y,\displaystyle\frac{\text{d}y}{\text{d}x},\cdots,\displaystyle\frac{\text{d}^ny}{\text{d}x^n}\right)=0$.

如果方程的左端为$y$及$\displaystyle\frac{\text{d}y}{\text{d}x},\cdots,\displaystyle\frac{\text{d}^ny}{\text{d}x^n}$的一次有理整式，则称为$n$阶线性微分方程。一般的阶线性微分方程具有形式
$$
\displaystyle\frac{\text{d}^ny}{\text{d}x^n}+a_1(x)\displaystyle\frac{\text{d}^{n-1}y}{\text{d}x^{n-1}}+\cdots+a_{n-1}(x)\displaystyle\frac{\text{d}y}{\text{d}x}+a_n(x)y=f(x)
$$
这里$a_1(x),a_2(x),\cdots,a_n(x),f(x)$是$x$的已知函数。

不是线性方程的方程称为非线性微分方程。

我们把含有$n$个独立的任意常数$c_1,c_2,\cdots,c_n$的解$y=\varphi(x,c_1,c_2,\cdots,c_n)$称为方程的通解。

关于解对于常数的独立性是指，对$\varphi$及其$n-1$阶偏导数关于$n$个常数$c_1,c_2,\cdots,c_n$的雅可比行列式$\displaystyle\frac{\partial(\varphi,\varphi',\cdots,\varphi^{(n-1)})}{\partial(c_1,c_2,\cdots,c_n)}$不为零。

对于满足初值条件:<br>
当$x=x_0$时$y=y_0,\displaystyle\frac{\text{d}y}{\text{d}x}=y_0^{(1)},\cdots,\displaystyle\frac{\text{d}^{n-1}y}{\text{d}x^{n-1}}=y_0^{(n-1)},$<br>
的解称为特解。

### 一阶微分方程

#### 可分离变量方程

形如
$$
\displaystyle\frac{\text{d}y}{\text{d}x}=f(x)\varphi(y)
$$
的方程，称为变量分离方程，这里$f(x),\varphi(x)$分别是$x,y$的连续函数。<br>
如果$\varphi(y)\neq0$，改写成$\displaystyle\frac{\text{d}y}{\varphi(y)}=f(x)\text{d}x$<br>
两边积分，得到$\displaystyle\int_{}^{}\displaystyle\frac{\text{d}y}{\varphi(y)}=\displaystyle\int_{}^{}f(x)\text{d}x+c.$

但如果存在$\varphi(y)=0$的解$y_0$，当$y=y_0$不包含在方程的通解中时，必须补上特解$y=y_0$。

#### 变量变换

(1)形如
$$
\displaystyle\frac{\text{d}y}{\text{d}x}=g \left(\displaystyle\frac{y}{x}\right).
$$
的方程，称为齐次微分方程，这里$g(u)$是$u$的连续函数。

做变量变换$u=\displaystyle\frac{y}{x}$，即$y=ux$，于是$\displaystyle\frac{\text{d}y}{\text{d}x}=x \displaystyle\frac{\text{d}u}{\text{d}x}+u$，代入原方程变为$x \displaystyle\frac{\text{d}y}{\text{d}x}+u=g(u)$，整理后得到$\displaystyle\frac{\text{d}u}{\text{d}x}=\displaystyle\frac{g(u)-u}{x}$，是一个变量分离方程。

(2)形如
$$
\displaystyle\frac{\text{d}y}{\text{d}x}=\displaystyle\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}.
$$
的方程也可以经变量变换化为变量分离方程，这里$a_1,a_2,b_1,b_2,c_1,c_2$均为常数。

我们分三类来讨论：

一、$\displaystyle\frac{a_1}{a_2}=\displaystyle\frac{b_1}{b_2}=\displaystyle\frac{c_1}{c_2}=k$(常数)情形<br>
这时方程化为$\displaystyle\frac{\text{d}y}{\text{d}x}=k$，有通解$y=kx+c$，其中$c$为任意常数。

二、$\displaystyle\frac{a_1}{a_2}=\displaystyle\frac{b_1}{b_2}=k\neq \displaystyle\frac{c_1}{c_2}$情形<br>
令$u=a_2x+b_2y$，这时有$\displaystyle\frac{\text{d}u}{\text{d}x}=a_2+b_2 \displaystyle\frac{\text{d}y}{\text{d}x}=a_2+b_2 \displaystyle\frac{ku+c_1}{u+c_2}$，是变量分离方程。

三、$\displaystyle\frac{a_1}{a_2}\neq \displaystyle\frac{b_1}{b_2}$情形<br>
如果方程中$c_1,c_2$不全为零，方程右边分子、分母都是$x,y$的一次多项式，因此
$$
\begin{cases}
a_1x+b_1y+c_1=0, &\text{}\\
a_2x+b_2y+c_2=0, &\text{}
\end{cases}
$$
代表$Oxy$平面上两条相交的直线，设交点为$(\alpha,\beta)$。若令
$$
\begin{cases}
X=x-\alpha, &\text{}\\
Y=y-\beta, &\text{}
\end{cases}
$$
，则化为
$$
\begin{cases}
a_1X+b_1Y=0, &\text{}\\
a_2X+b_2Y=0, &\text{}
\end{cases}
$$
，从而变为
$$
\displaystyle\frac{\text{d}Y}{\text{d}X}=\displaystyle\frac{a_1X+b_1Y}{a_2X+b_2Y}=g \left(\displaystyle\frac{Y}{X}\right)
$$
，为变量分离方程。<br>
如果$c_1=c_2=0$，可不必求解，直接取变换$u=\displaystyle\frac{y}{x}$即可。

上述解题方法和步骤也适用于更一般的方程类型
$$
\displaystyle\frac{\text{d}y}{\text{d}x}f \left(\displaystyle\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)
$$
此外，诸如$\displaystyle\frac{\text{d}y}{\text{d}x}=f(ax+by+c),yf(xy)\text{d}x+xg(xy)\text{d}y=0,x^2 \displaystyle\frac{\text{d}y}{\text{d}x}=f(xy),\displaystyle\frac{\text{d}y}{\text{d}x}=xf \left(\displaystyle\frac{y}{x^2}\right).$以及$M(x,y)(x \text{d}x+y \text{d}y)+N(x,y)(x \text{d}y-y \text{d}x)=0$ <br>
(其中$M,N$为$x,y$的齐次函数，次数可以不相同)等一些方程类型，均可通过适当的变量变换化为变量分离方程。

#### 一阶线性方程

一阶线性微分方程
$$
\displaystyle\frac{\text{d}y}{\text{d}x}+P(x)y=Q(x)
$$
其中$P(x),Q(x)$在考虑的区间上是$x$的连续函数。

若$Q(x)=0$，变为$\displaystyle\frac{\text{d}y}{\text{d}x}+P(x)y=0$，称为一阶齐次线性微分方程. <br>
若$Q(x)\neq0$，称为非齐次线性微分方程。

$\displaystyle\frac{\text{d}y}{\text{d}x}+P(x)y=0$是变量分离方程，解为$y=ce^{-\int_{}^{}P(x)\text{d}x}$，这里$c$是任意常数。

非齐次线性微分方程的通解为$y=e^{-\int_{}^{}P(x)\text{d}x}\left(\displaystyle\int_{}^{}Q(x)e^{\int_{}^{}P(x)\text{d}x}\text{d}x+\tilde c\right)$.

具体的过程为 <br>
将$y=ce^{-\int_{}^{}P(x)\text{d}x}$的常数$c$变易为$x$的待定函数$c(x)$。<br>
令$y=c(x)e^{- \int_{}^{}P(x)\text{d}x}$，微分之，得到$\displaystyle\frac{\text{d}y}{\text{d}x}=\displaystyle\frac{\text{d}c(x)}{\text{d}x}e^{- \int_{}^{}P(x)\text{d}x}+c(x)P(x)e^{-\int_{}^{}P(x)\text{d}x}$。<br>
将以上两式带入$\displaystyle\frac{\text{d}y}{\text{d}x}+P(x)y=Q(x)$，<br>
得到$\displaystyle\frac{\text{d}c(x)}{\text{d}x}e^{- \int_{}^{}P(x)\text{d}x}+c(x)P(x)e^{-\int_{}^{}P(x)\text{d}x}-P(x)c(x)e^{-\int_{}^{}P(x)\text{d}x}=Q(x)$，<br>
即$\displaystyle\frac{\text{d}c(x)}{\text{d}x}=Q(x)e^{\int_{}^{}P(x)\text{d}x}$，<br>
积分后得到
$$
c(x)=\displaystyle\int_{}^{}Q(x)e^{\int_{}^{}P(x)\text{d}x}\text{d}x+\tilde c.
$$

这里将常数变易为待定函数的方法，我们通常称为常数变易法。这实际上是一种变量变换的方法，通过变换将方程化为变量分离方程。

若方程不能变换为相应的形式，可以将$x$看作是$y$的函数，再看看是否符合形式。

#### 伯努利方程

形如
$$
\frac{\text{d}y}{\text{d}x}=P(x)y+Q(x)y^n
$$
的方程，称为伯努利方程，这里$P(x),Q(x)$为$x$的连续函数，$n\neq0,1$是常数。

利用变量变换可以将伯努利微分方程化为线性微分方程。<br>
对于$y\neq0$，用$y^{-n}$乘两边，得到$y^{-n}\displaystyle\frac{\text{d}y}{\text{d}x}=y^{1-n}P(x)+Q(x)$，<br>
引入变量变换$z=y^{1-n}$ <br>
从而$\displaystyle\frac{\text{d}z}{\text{d}x}=(1-n)y^{-n}\displaystyle\frac{\text{d}y}{\text{d}x}$，<br>
将以上带入$y^{-n}\displaystyle\frac{\text{d}y}{\text{d}x}=y^{1-n}P(x)+Q(x)$，得到
$$
\frac{\text{d}z}{\text{d}x}=(1-n)P(x)z+(1-m)Q(x)
$$
这是线性微分方程，可以按照上面的方法求得它的通解，然后代回原来的变量，得到最终的通解。<br>
此外，当$n>0$时，方程还有解$y=0$。

#### 恰当微分方程

我们可以将一阶方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y)$写成微分的形式$f(x,y)\text{d}x- \text{d}y=0$，或把$x,y$平等看待，写成下面具有对称形式的一阶微分方程
$$
M(x,y)\text{d}x+N(x,y)\text{d}y=0
$$
这里假设$M(x,y),N(x,y)$在某矩形域内是$x,y$的连续函数，且具有连续的一阶偏导数

如果方程恰好是某个二元函数$u(x,y)$的全微分，即
$$
M(x,y)\text{d}x+N(x,y)\text{d}y=\text{d}u(x,y)=\displaystyle\frac{\partial u}{\partial x}\text{d}x+\displaystyle\frac{\partial u}{\partial y}\text{d}y.
$$
则称其为恰当微分方程。容易验证，其通解就是$u(x,y)=c$，这里$c$是任意常数。

恰当微分方程成立的充要条件是$\displaystyle\frac{\partial M}{\partial y}=\displaystyle\frac{\partial N}{\partial x}$

恰当微分方程的通解就是$\displaystyle\int_{}^{}M(x,y)\text{d}x+\displaystyle\int_{}^{}\left[N- \displaystyle\frac{\partial}{\partial y}\displaystyle\int_{}^{}M(x,y)\text{d}x\right]\text{d}y=c$,这里$c$是任意常数。

利用线积分解即为$u(x,y)=\displaystyle\int_{(x_0,y_0)}^{(x,y)}M(x,y)\text{d}x+N(x,y)\text{d}y=c$

一些简单二元函数的全微分如下：
$$
\begin{align}
&y \text{d}x+x \text{d}y=\text{d}(xy)\\
&\displaystyle\frac{y \text{d}x-x \text{d}y}{y^2}=\text{d}\left(\displaystyle\frac{x}{y}\right)\\
&\displaystyle\frac{-y \text{d}x+x \text{d}y}{x^2}=\text{d}\left(\displaystyle\frac{y}{x}\right)\\
&\displaystyle\frac{y \text{d}x-x \text{d}y}{xy}=\text{d}\left(\ln \left|\displaystyle\frac{x}{y}\right|\right)\\
&\displaystyle\frac{y \text{d}x-x \text{d}y}{x^2+y^2}=\text{d}\left(\arctan \displaystyle\frac{x}{y}\right)\\
&\displaystyle\frac{y \text{d}x-x \text{d}y}{x^2-y^2}=\displaystyle\frac{1}{2}\left(\ln \left|\displaystyle\frac{x-y}{x+y}\right|\right).
\end{align}
$$

#### 积分因子

如果存在连续可微的函数$\mu=\mu(x,y)\neq0$，使得
$$
\mu(x,y)M(x,y)\text{d}x+\mu(x,y)N(x,y)\text{d}y=0
$$
为一恰当微分方程，即存在函数$v$使
$$
\mu M \text{d}x+\mu N \text{d}y\equiv\text{d}v
$$
则称$\mu(x,y)$为方程$M \text{d}x+N \text{d}y=0$的积分因子。

可以证明，只要方程有解存在，则必有积分因子存在，并且不是唯一的。

##### 下面讨论两种特殊的情况

如果存在只与$x$有关的积分因子$\mu=\mu(x)$，则$\displaystyle\frac{\partial\mu}{\partial y}=0$，这时方程$M \text{d}x+N \text{d}y=0$变成
$$
N \displaystyle\frac{\text{d}\mu}{\text{d}x}=\left(\displaystyle\frac{\partial M}{\partial y}- \displaystyle\frac{\partial N}{\partial N}\right)\mu
$$
即
$$
\displaystyle\frac{\text{d}\mu}{\mu}=\displaystyle\frac{\displaystyle\frac{\partial M}{\partial N}- \displaystyle\frac{\partial N}{\partial x}}{N}\text{d}x
$$
由此可知，方程$M \text{d}x+N \text{d}y=0$有只与有关的积分因子的充要条件是
$$
\displaystyle\frac{\displaystyle\frac{\partial M}{\partial y}- \displaystyle\frac{\partial N}{\partial x}}{N}\text{d}x=\psi(x)
$$
这里$\psi(x)$仅为$x$的函数。<br>
假如以上条件成立，则可以求得方程$M \text{d}x+N \text{d}y=0$的一个积分因子
$$
\mu=e^{\int_{}^{}\psi(x)\text{d}x}
$$
同样，如果存在只与$y$相关的积分因子的充要条件是
$$
\displaystyle\frac{\displaystyle\frac{\partial M}{\partial y}- \displaystyle\frac{\partial N}{\partial x}}{-M}=\varphi(y)
$$
这里$\varphi(y)$仅为$y$的函数。<br>
从而求得方程$M \text{d}x+N \text{d}y=0$的一个积分因子
$$
\mu=e^{\int_{}^{}\varphi(y)\text{d}y}
$$

#### 一阶隐式微分方程与参数表示

##### 可以解出$x$或$y$的方程

1.首先讨论形如
$$
y=f \left(x,\displaystyle\frac{\text{d}y}{\text{d}t}\right)
$$
的方程的解法，这里假设函数$y=f \left(x,\displaystyle\frac{\text{d}y}{\text{d}t}\right)$有连续的偏导数。<br>
引进参数$\displaystyle\frac{\text{d}y}{\text{d}x}=p$，则上式变为$y=f(x,p)$，将两边对$x$求导，并以$\displaystyle\frac{\text{d}y}{\text{d}x}=p$代入，得到
$$
\begin{align}
p=\displaystyle\frac{\partial f}{\partial x}+\displaystyle\frac{\partial f}{\partial p}\displaystyle\frac{\text{d}p}{\text{d}x}.\tag{2.64}
\end{align}
$$
是关于$x,p$的一阶微分方程。<br>
若已求得(2.64)的通解的形式为$p=\varphi(x,c)$，将其代入$y=f(x,p)$，得到$y=f(x,\varphi(x,c))$，这就是的通解。<br>
若求得(2.64)的通解的形式为$x=\psi(p,c)$，则得到的$y=f \left(x,\displaystyle\frac{\text{d}y}{\text{d}t}\right)$的参数形式的通解为
$$
\begin{cases}
x=\psi(p,c)\\
y=f(\psi(p,c),p)
\end{cases}
$$
其中$p$是参数，$c$是任意常数。<br>
若求得(2.64)的通解的形式为$\Phi(x,p,c)=0$，则得到的$y=f \left(x,\displaystyle\frac{\text{d}y}{\text{d}t}\right)$的参数形式的通解为
$$
\begin{cases}
\Phi(x,p,c)\\
y=f(x,p)
\end{cases}
$$
其中$p$是参数，$c$为任意常数。

2.形如
$$
x=f \left(y,\displaystyle\frac{\text{d}y}{\text{d}x}\right)
$$
的方程的求解方法与1的方程的求解方法完全类似。这里假定函数$f \left(y,\displaystyle\frac{\text{d}y}{\text{d}x}\right)$有连续的偏导数。<br>
引进参数$\displaystyle\frac{\text{d}y}{\text{d}x}=p$，则变为$x=f(y,p)$，两边对$y$求导数，然后以$\displaystyle\frac{\text{d}x}{\text{d}y}=\displaystyle\frac{1}{p}$代入，得到
$$
\displaystyle\frac{1}{p}=\displaystyle\frac{\partial f}{\partial y}+\displaystyle\frac{\partial f}{\partial p}\displaystyle\frac{\text{d}p}{\text{d}y}
$$
以上方程是关于$y,p$的一阶微分方程，但它的导数$\displaystyle\frac{\text{d}p}{\text{d}y}$已解出。于是按照1的方法。<br>
设求得通解为$\Phi(y,p,c)$，则得到的通解为
$$
\begin{cases}
x=f(y,p)\\
\Phi(y,p,c)
\end{cases}
$$

##### 不显含$x$或$y$的方程

3.现在讨论形如
$$
F(x,y')=0
$$
的方程的解法。<br>
记$p=y'=\displaystyle\frac{\text{d}y}{\text{d}x}$，从几何的观点看，$F(x,p)$代表$Oxp$平面上的一条曲线。设把这曲线表为适当的参数形式
$$
\begin{cases}
x=\varphi(t)\\
p=\psi(t)
\end{cases}
$$
这里$t$为参数。<br>
再注意到沿方程$F(x,y')=0$的任何一条积分曲线上，恒满足基本关系$\text{d}y=p\text{d}x$。<br>
以上式代入得$\text{d}y=\psi(t)\varphi'(t)\text{d}t$，两边积分得到$y=\displaystyle\int_{}^{}\psi(t)\varphi'(t)\text{d}t+c$，于是方程的参数形式的通解为
$$
\begin{cases}
x=\varphi(t)\\
y=\displaystyle\int_{}^{}\psi(t)\varphi'(t)\text{d}t+c.
\end{cases}
$$
$c$为任意常数。

4.形如$F(y,y')=0$的方程其求解方法与3.的方程的求解方法类似。<br>
记$p=y'$，引入参数$t$，将方程表为适当的参数形式
$$
\begin{cases}
y=\varphi(t)\\
p=\psi(t)
\end{cases}
$$
由$\text{d}y=p \text{d}x\Rightarrow\varphi'(t)\text{d}t=\psi(t)\text{d}t$得
$$
\text{d}x=\displaystyle\frac{\varphi'(t)}{\psi(t)}\text{d}t,x=\displaystyle\int_{}^{}\displaystyle\frac{\varphi'(t)}{\psi(t)}\text{d}t+c
$$
于是
$$
\begin{cases}
x=\displaystyle\int_{}^{}\displaystyle\frac{\varphi'(t)}{\psi(t)}\text{d}t+c\\
y=\varphi(t)
\end{cases}
$$
为方程的参数形式的通解，其中$c$为任意常数。<br>
此外，不难验证，若$F(y,0)=0$有实根$y=k$，则$y=k$也是方程的解。

### 一阶微分方程的解的存在定理

解的存在和唯一是微分方程近似解法的前提。

#### 解的存在唯一性与逐步逼近法

##### 存在唯一性定理

李普希茨条件：<br>
首先考虑导数已解出的一阶微分方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y)$，这里$f(x,y)$是在矩形域$R:|x-x_0|\leqslant a,|y-y_0|\leqslant b$上的连续函数。<br>
函数$f(x,y)$称为在$R$上关于满足李普希茨(Lipschitz)条件，如果存在常数$L>0$，使得不等式
$$
|f(x,y_1)-f(x,y_2)|\leqslant L|y_1-y_2|
$$
对于所有$(x,y_1),(x,y_2)\in R$都成立，$L$称为李普希茨常数。

定理1：如果$f(x,y)$在矩形域$R$上连续且关于$y$满足李普希茨条件，则方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y)$存在唯一的解$y=\varphi(x)$，定义于区间$|x-x_0|\leqslant h$上，连续且满足初值条件
$$
\varphi(x_0)=y_0
$$
这里$h=\min \left(a,\displaystyle\frac{b}{M}\right),M=\underset{(x,y)\in R}{\max}|f(x,y)|$。

我们采用皮卡($Picard$)的逐步逼近法来证明这个定理。

我们分五个命题来证明定理。

命题1 <br>
设$y=\varphi(x)$是方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y)$的定义于区间$x_0\leqslant x\leqslant x_0+h$上，满足初始条件$\varphi(x_0)=y_0$的解，则$y=\varphi(x)$是积分方程
$$
\begin{align}
y=y_0+\displaystyle\int_{x_0}^{x}f(x,y)\text{d}x,x_0\leqslant x\leqslant x_0+h \tag{3.5}
\end{align}

$$
的定义于$x_0\leqslant x\leqslant x_0+h$上的连续解。反之亦然。

现在取$\varphi(x_0)=y_0$，构造皮卡逐步逼近函数序列如下：
$$
\begin{align}
\begin{cases}
\varphi(x_0)&=y_0\\
\varphi(x_n)&=y_0+\displaystyle\int_{x_0}^{x}f(\xi,\varphi_{n-1}(\xi))\text{d}\xi,x_0\leqslant x\leqslant x_0+h,(n=1,2,\cdots)
\end{cases}\tag{3.7}
\end{align}
$$

命题2 <br>
对于所有的$n$，(3.7)中的函数$\varphi_n(x)$在$x_0\leqslant x\leqslant x_0+h$上有定义、连续且满足不等式
$$
|\varphi_n(x)-y_0|\leqslant b.
$$

命题3 <br>
函数序列$\{\varphi_n(x)\}$在$x_0\leqslant x\leqslant x_0+h$上是一致收敛的。

现设$\displaystyle\lim_{n\to \infty}\varphi_n(x)=\varphi(x)$，则$\varphi(x)$也在$x_0\leqslant x\leqslant x_0+h$上连续，且由上又可知$|\varphi_n(x)-y_0|\leqslant b$.

命题4 <br>
$\varphi(x)$是积分方程(3.5)的定义于$x_0\leqslant x\leqslant x_0+h$上的连续解。

命题5 <br>
设$\psi(x)$是积分方程(3.5)的定义于$x_0\leqslant x\leqslant x_0+h$上的另一个连续解，则$\varphi(x)=\psi(x)(x_0\leqslant x\leqslant x_0+h)$。

综合命题1～5,即得到存在唯一性定理的证明。

附注2 <br>
由于李普希茨条件比较难于检验，常用$f(x,y)$在$R$上有对$y$的连续偏导数来代替。事实上，如果在$R$上$\displaystyle\frac{\partial f}{\partial y}$存在且连续，则$\displaystyle\frac{\partial f}{\partial y}$在$R$上有界。设在$R$上$\left|\displaystyle\frac{\partial f}{\partial y}\leqslant L\right|$这时
$$
|f(x,y_1)-f(x,y_2)|=\left|\displaystyle\frac{\partial f(x,y_2+\theta(y_1-y_2))}{\partial y}\right||y_1-y_2|\leqslant L|y_1-y_2|
$$

附注3 <br>
设方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y)$是线性的，即方程为$\displaystyle\frac{\text{d}y}{\text{d}x}=P(x)y+Q(x)$<br>
那么容易知道，当$P(x),Q(x)$在区间$[\alpha,\beta]$上为连续时，定理1的条件就能满足。<br>
不仅如此，这时由任一初值$(x_0,y_0),x_0\in[\alpha,\beta]$所确定的解在整个区间$[\alpha,\beta]$上都有定义。

现在考虑一阶隐方程$F(x,y,y')=0$，根据隐函数存在定理，若于$(x_0,y_0,y'_0)$的某一邻域内$F$连续且$F(x_0,y_0,y'_0)=0$，而$\displaystyle\frac{\partial F}{\partial y'}\neq0$，则必可把$y'$唯一地表示为$x,y$的函数$y'=f(x,y)$，并且$f(x,y)$于$(x_0,y_0)$的某一邻域内连续，且满足$y'_0=f(x_0,y_0)$。<br>
更进一步，如果$F$关于所有变元存在连续偏导数，则$f(x,y)$对$x,y$也存在连续偏导数，并且$\displaystyle\frac{\partial f}{\partial y}=- \displaystyle\frac{\partial F}{\partial y}/ \displaystyle\frac{\partial F}{\partial y'}$，显然呢它是有界的。于是依定理1,方程$y'=f(x,y)$满足初值条件$y(x_0)=y_0$的解存在且唯一，即方程$F(x,y,y')=0$的过点$(x_0,y_0)$且切线斜率为$y_0'$的积分曲线存在且唯一。这样便得到下面的定理。

定理2 <br>
如果在点$(x_0,y_0,y'_0)$的某一邻域中，<br>
1.$F(x,y,y')$对所有变元$(x,y,y')$连续，且存在连续偏导数。<br>
2.$F(x_0,y_0,y'_0)=0$<br>
3.$\displaystyle\frac{\partial F(x_0,y_0,y'_0)}{\partial y'}\neq0$<br>
则方程$F(x,y,y')=0$存在唯一解$y=y(x),|x-x_0|\leqslant h$($h$为足够小的正数)满足初值条件$y(x_0)=y_0,y'(x_0)=y'_0$。

#### 近似计算和误差估计

存在唯一性定理不仅肯定了解的存在唯一性，并且在证明方法总所采用的逐步逼近发在实用上也是求方程近似解的一种方法。<br>
在估计式
$$
|\varphi_n(x)-\psi(x)|\leqslant \displaystyle\frac{ML^n}{(n+1)!}h^{n+1}(x_0\leqslant x\leqslant x_0+h)
$$
中令$\psi(x)=\varphi(x)$，我们就得到第$n$次近似解$\varphi_n(x)$和真正解$\varphi(x)$在区间$|x-x_0|\leqslant h$内的误差估计式
$$
|\varphi_n(x)-\varphi(x)|\leqslant \displaystyle\frac{ML^n}{(n+1)!}h^{n+1}
$$
这样，我们在进行近似计算时，可以根据误差的要求，选取适当的逐步逼近函数$\varphi_n(x)$。

#### 解的延拓

解的延拓定理 <br>
如果方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y)$右端的函数$f(x,y)$在有界区域$G$中连续，且在$G$内关于$y$满足局部李普希茨条件，那么方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y)$的通过$G$内任何一点$(x_0,y_0)$的解$y=\varphi(x)$可以延拓，直到点任$(x,\varphi(x))$意接近区域$G$的边界。以向$x$增大的方向的延拓来说，如果$y=\varphi(x)$只能延拓到区间$x_0\leqslant x < d$上，则当$x\to d$时，$(x,\varphi(x))$趋于区域$G$的边界。

推论 <br>
如果$G$是无界区域，在上面解的延拓定理的条件下，方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y)$的通过点$(x_0,y_0)$的解$y=\varphi(x)$可以延拓，以向$x$增大的一方的延拓来说，有下面的两种情况：<br>
(1)解$y=\varphi(x)$可以延拓到区间$[x_0,+\infty)$, <br>
或 <br>
(2)解$y=\varphi(x)$只可以延拓到区间$[x_0,d)$，其中$d$为有限数，则当$x\to d$时，或者$y=\varphi(x)$无界，或者点$(x,\varphi(x))$趋于区域$G$的边界。

#### 解对初值的连续性和可微性定理

##### 解关于初值的对称性

定理：<br>
设方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y)$的满足初值条件$y(x_0)=y_0$的解是唯一的，记为$y=\varphi(x,x_0,y_0)$，则在此表达式中，$(x,y)$与$(x_0,y_0)$可以调换其相对位置，即在解的存在范围内成立着关系式$y_0=\varphi(x_0,x,y)$

##### 解对初值的连续依赖性

引理：<br>
如果函数$f(x,y)$于某域$D$内连续，且关于$y$满足李普希茨条件(李普希茨常数为$L$)，则对方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y)$的任意两个解$\varphi(x)$及$\psi(x)$，在它们公共存在的区间内成立着不等式
$$
|\varphi(x)-\psi(x)|\leqslant |\varphi(x_0)-\psi(x_0)|e^{L|x-x_0|}
$$
其中$x_0$为所考虑区间内的某一值。

解对初值的连续依赖定理：<br>
假设$f(x,y)$于域$G$内连续且关于$y$满足局部李普希茨条件，$(x_0,y_0)\in G,y=\varphi(x,x_0,y_0)$是方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y)$的满足初值条件$y(x_0)=y_0$的解，它于区间$a\leqslant x\leqslant b$上有定义$(a\leqslant x_0\leqslant b)$，那么，对任意给定的$\varepsilon > 0$，必能找到$\delta=\delta(\varepsilon,a,b)$正数，使得当
$$
(\bar{x_0}-x_0)^2+(\bar{y_0}-y_0)^2\leqslant \delta^2
$$
时方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y)$的满足条件$y(\bar{x_0})=\bar{y_0}$的解在区间$a\leqslant x\leqslant b$上也有定义，并且
$$
|\varphi(x,\bar{x_0},\bar{y_0})-\varphi(x,x_0,y_0)| < \varepsilon,a\leqslant x\leqslant b
$$

解对初值的连续性定理：<br>
若函数$f(x,y)$在区域$G$内连续且关于$y$满足局部李普希茨条件，则方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y)$的解$y=\varphi(x,x_0,y_0)$作为$x,x_0,y_0$的函数在它的存在范围内是连续的。

我们还可以讨论含有参数的微分方程
$$
\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y,\lambda)
$$
用$G_{\lambda}$表示域:$G_{\lambda}:(x,y)\in G,\alpha < \lambda< \beta$<br>
设$f(x,y,\lambda)$在$G_{\lambda}$内连续，且在$G_{\lambda}$内一致地关于$y$满足李普希茨条件，也就是说，对$G_{\lambda}$内的每一点$(x,y,\lambda)$都存在以$(x,y,\lambda)$为中心的球$C\subset G_{\lambda}$，使得对任何$(x,y_1,\lambda),(x,y_1,\lambda)\in C$，成立不等式
$$
|f(x,y_1,\lambda)-f(x,y_2,\lambda)|\leqslant|y_1-y_2|
$$
其中$L$是与$\lambda$无关的正数。由解的存在唯一性定理，对每一$\lambda_0\in(\alpha,\beta)$，方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y,\lambda)$的通过点$(x_0,y_0)\in G$的解唯一确定。我们把这个解记为$y=\varphi(x,x_0,y_0,\lambda_0)$，于是有$y_0=\varphi(x_0,x_0,y_0,\lambda_0)$。

解对初值和参数的连续依赖定理 <br>
设$f(x,y,\lambda)$在$G_{\lambda}$内连续，且在$G_{\lambda}$内关于$y$一致地满足局部李普希茨条件，$(x_0,y_0,\lambda_0)\in G_{\lambda},y=\varphi(x,x_0,y_0,\lambda_0)$是方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y,\lambda)$通过点$(x_0,y_0)$的解，在区间$a\leqslant x\leqslant b$上有定义，其中$a\leqslant x_0\leqslant b$，那么，对任意给定的$\varepsilon\ge0$，可以找到正数$\delta=\delta(\varepsilon,a,b)$，使得当
$$
(\bar{x}_0-x_0)^2+(\bar{y}_0-y_0)^2+(\lambda-\lambda_0)^2\leqslant\delta^2
$$
时，方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y,\lambda)$通过点$(\bar{x}_0,\bar{y}_0)$的解$y=\varphi(x,\bar{x}_0,\bar{y}_0,\lambda)$在区间$a\leqslant x\leqslant b$上也有定义，并且
$$
|\varphi(x,\bar{x}_0,\bar{y}_0,\lambda)-\varphi(x,x_0,y_0,\lambda_0)| < \varepsilon,a\leqslant x\leqslant b.
$$

解对初值和参数的连续性定理 <br>
设$f(x,y,\lambda)$在$G_{\lambda}$内哦连续，且在$G_{\lambda}$内关于$y$一致地满足局部的李普希茨条件，则方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y,\lambda)$的解$y=\varphi(x,x_0,y_0,\lambda)$作为$x,x_0,y_0,\lambda$的函数在它的存在范围内是连续的。

解对初值的可微性定理 <br>
若函数$f(x,y)$以及$\displaystyle\frac{\partial f}{\partial y}$都在区域$G$内连续，则方程$\displaystyle\frac{\text{d}y}{\text{d}x}=f(x,y)$的解$y=\varphi(x,x_0,y_0)$作为$x,x_0,y_0$的函数在它的存在范围内是连续可微的。

### 高阶微分方程

#### 线性微分方程的一般理论

我们讨论如下的$n$阶线性微分方程
$$
\begin{align}
\displaystyle\frac{\text{d}^n x}{\text{d}t^n}+a_1(t)\displaystyle\frac{\text{d}^{n-1}x}{\text{d}t^{n-1}}+\cdots+a_{n-1}(t)\displaystyle\frac{\text{d}x}{\text{d}t}+a_n(t)x=f(t)\tag{4.1}
\end{align}
$$
其中$a_i(t)(i=1,2,\cdots,n)$及$f(t)$都是区间$a\leqslant t\leqslant b$上的连续函数。<br>
如果$f(t)\equiv0$，则方程(4.1)变为
$$
\begin{align}
\displaystyle\frac{\text{d}^n x}{\text{d}t^n}+a_1(t)\displaystyle\frac{\text{d}^{n-1}x}{\text{d}t^{n-1}}+\cdots+a_{n-1}(t)\displaystyle\frac{\text{d}x}{\text{d}t}+a_n(t)x=0\tag{4.2}
\end{align}
$$
我们称它为$n$阶齐次线性微分方程，简称齐次线性微分方程，而称一般的方程(4.1)为$n$阶非齐次线性微分方程，简称非齐次线性微分方程，并且通常把方程(4.2)叫做对应于方程(4.1)的齐次线性微分方程。

定理1 <br>
如果$a_i(t)(i=1,2,\cdots,n)$及$f(t)$都是区间$a\leqslant t\leqslant b$上的连续函数，则对于任一$t_0\in[a,b]$及任意的$x_0,x_0^{(1)},\cdots,x_0^{(n-1)}$，方程(4.1)存在唯一解$x=\varphi(t)$，定义于区间$a\leqslant t\leqslant b$上，且满足初值条件
$$
\varphi(t_0)=x_0,\displaystyle\frac{\text{d}\varphi(t_0)}{\text{d}t}=x_0^{(1)},\cdots,\displaystyle\frac{\text{d}^{n-1}\varphi(t_0)}{\text{d}t^{n-1}}=x_0^{(n-1)}
$$
从这个定理可以看出，初值条件唯一地确定了方程(4.1)的解，而且这个解在所有$a_i(t)(i=1,2,\cdots,n)$及$f(t)$连续的整个区间$a\leqslant t\leqslant b$上有定义。

##### 齐次线性微分方程的解的性质与结构

定理2(叠加原理) <br>
如果$x_1(t),x_2(t),\cdots,x_k(t)$是方程(4.2)的$k$个解，则它们的线性组合$c_1x_1(t)+c_2x_2(t)+\cdots+c_kx_k(t)$也是(4.2)的解，这里$c_1,c_2,\cdots,c_k$是任意常数。

定理3 <br>
若函数$x_1(t),x_2(t),\cdots,x_n(t)$在区间$a\leqslant t\leqslant b$上线性相关，则在$[a,b]$上它们的朗斯基行列式
$$
W(t)=\begin{vmatrix}
x_1(t) & x_2(t) & \cdots & x_n(t) \\
x_1'(t) & x_2'(t) & \cdots & x_n'(t) \\
\vdots & \vdots & \cdots & \vdots \\
x_1^{k-1}(t) & x_2^{k-1}(t) & cdots & x_n^{k-1}(t) \\
\end{vmatrix}\equiv0
$$。

定理4 <br>
如果方程(4.2)的解$x_1(t),x_2(t),\cdots,x_n(t)$在区间$a\leqslant t\leqslant b$上线性无关，则$W[x_1(t),x_2(t),\cdots,x_n(t)]$在这个区间上的任何点上都不等于零，即$W(t)\neq0(a\leqslant t\leqslant b)$。

定理5 <br>
$n$阶齐次线性微分方程(4.2)一定存在$n$个线性无关的解。

定理6(通解机构定理) <br>
如果$x_1(t),x_2(t),\cdots,x_n(t)$是方程(4.2)的$n$个线性无关的解，则方程(4.2)的通解可表示为
$$
\begin{align}
x=c_1x_1(t)+c_2x_2(t)+\cdots+c_nx_n(t)\tag{4.11}
\end{align}
$$
其中$c_1,x_2,\cdots,x_n$是任意常数。且通解(4.11)包括了方程(4.2)的所有解。

推论 <br>
方程(4.2)的线性无关的解的最大个数等于$n$。因此可得结论：$n$阶齐次线性微分方程的所有解构成一个$n$维线性空间。<br>
方程(4.2)的一组$n$个线性无关的解称为方程的一个基本解组。显然，基本解组不是唯一的。特别地，当$W(t_0)=1$时称其为标准基本解组。

##### 非齐次线性微分方程与常数变易法

性质1 <br>
如果$\bar{x}(t)$是方程(4.1)的解，而$x(t)$是方程(4.2)的解，则$\bar{x}(t)+x(t)$也是方程(4.1)的解。

性质2 <br>
方程(4.1)的任意两个解之差必为方程(4.2)的解。

定理7 <br>
设$x_1(t),x_2(t),\cdots,x_n(t)$为方程(4.2)的基本解组，而是方程(4.1)的某一解，则方程(4.1)的通解可表示为
$$
\begin{align}
x=c_1x_1(t)+c_2x_2(t)+\cdots+c_nx_n(t)+\bar{x}(t)\tag{4.14}
\end{align}
$$
其中$c_1,c_2,\cdots,c_n$为任意常数。而且这个通解(4.14)包括了方程(4.1)的所有解。

例题 <br>
求方程$x''+x=\displaystyle\frac{1}{\cos t}$的通解，已知它的对应齐次线性微分方程的基本解组为$\cos t,\sin t$。<br>
解：应用常数变易法，令
$$
x=c_1(t)\cos t+c_2(t)\sin t,
$$
将它代入方程，则可得决定$c'_1(t)$和$c'_2(t)$的两个方程
$$
\begin{cases}
\cos tc'_1(t)+\sin tc_2'(t)=0, \\
-\sin tc_1'(t)+\cos tc_2'(t)=\displaystyle\frac{1}{\cos t},
\end{cases}
$$
解得
$$
c_1'(t)=- \displaystyle\frac{\sin t}{\cos t},c_2'(t)=1
$$
由此
$$
c_1(t)=\ln|\cos t|+\gamma_1,c_2(t)=t+\gamma_2
$$
于是原方程的通解为
$$
x=\gamma_1\cos t+\gamma_2\sin t+\cos t\ln|\cos t|+t\sin t,
$$
其中$\gamma_1,\gamma_2$为任意常数。

### 常系数线性微分方程的解法

定理8 <br>
如果方程(4.2)中所有系数$a_i(t)(i=1,2,\cdots,n)$都是实值函数，而$x=z(t)=\varphi(t)+i\psi(t)$是方程的复值解，则$z(t)$的实部$\varphi(t)$、虚部$\psi(t)$和共轭复值函数$\bar{z}(t)$也都是方程(4.2)的解。

定理9 <br>
若方程
$$
\displaystyle\frac{\text{d}^nx}{\text{d}t^n}+a_1(t)\displaystyle\frac{\text{d}^{n-1}x}{\text{d}t^{n-1}}+\cdots+a_{n-1}(t)\displaystyle\frac{\text{d}x}{\text{d}t}+a_n(t)x=u(t)+iv(t)
$$
有复值解$x=U(t)+iV(t)$，这里$a_i(t)(i=1,2,\cdots,n)$及$u(t),v(t)$都是实函数，那么这个解的实部$U(t)$和虚部$V(t)$分别是方程
$$
\displaystyle\frac{\text{d}^nx}{\text{d}t^n}+a_1(t)\displaystyle\frac{\text{d}^{n-1}x}{\text{d}t^{n-1}}+\cdots+a_{n-1}(t)\displaystyle\frac{\text{d}x}{\text{d}t}+a_n(t)x=u(t)
$$
和
$$
\displaystyle\frac{\text{d}^nx}{\text{d}t^n}+a_1(t)\displaystyle\frac{\text{d}^{n-1}x}{\text{d}t^{n-1}}+\cdots+a_{n-1}(t)\displaystyle\frac{\text{d}x}{\text{d}t}+a_n(t)x=v(t)
$$
的解。

#### 常系数齐次线性微分方程和欧拉方程

设齐次线性微分方程中所有系数都是常数，即方程有如下形状
$$
\begin{align}
L[x]\equiv\displaystyle\frac{\text{d}^nx}{\text{d}t^n}+a_1\displaystyle\frac{\text{d}^{n-1}x}{\text{d}t^{n-1}}+\cdots+a_{n-1}\displaystyle\frac{\text{d}x}{\text{d}t}+a_nx=0\tag{4.19}
\end{align}
$$
其中$a_1,a_2,\cdots,a_n$为常数。我们称(4.19)为$n$阶常系数齐次线性微分方程。

它的求解问题可以归结为代数方程求根问题，使用欧拉(Euler)待定指数函数法(又称为特征根法).

回顾一阶常系数齐次线性微分方程$\displaystyle\frac{\text{d}x}{\text{d}t}+ax=0$，我们知道它有形如$x=e^{-at}$的解，且它的通解就是$x=ce^{-at}$。<br>
这启示我嫩对于方程(4.19)也去试求指数函数形式的解$x=e^{\lambda t}$，其中$\lambda$是待定常数，可以是实的，也可以是复的。

注意到
$$
L[e^{\lambda t}]\equiv \displaystyle\frac{\text{d}^ne^{\lambda t}}{\text{d}t^n}+a_1 \displaystyle\frac{\text{d}^{n-1}e^{\lambda t}}{\text{d}t^{n-1}}+\cdots+a_{n-1}\displaystyle\frac{\text{d}e^{\lambda t}}{\text{d}t}+a_ne^{\lambda t}=(\lambda^n+a_1\lambda^{n-1}+\cdots+a_{n-1}\lambda+a_n)e^{\lambda t}\equiv F(\lambda)e^{\lambda t}
$$
其中$F(\lambda)\equiv\lambda^n+a_1\lambda^{n-1}+\cdots+a_{n-1}\lambda+a_n$是$\lambda$的$n$次多项式。易知，$x=e^{\lambda t}$为方程(4.19)的解的充要条件是是代数方程
$$
\begin{align}
F(\lambda)\equiv\lambda^n+a_1\lambda^{n-1}+\cdots+a_{n-1}\lambda+a_n=0\tag{4.21}
\end{align}
$$
的根。

因此，方程(4.21)将起着预示方程(4.19)的解的特征的作用，我们称它为方程(4.19)的特征方程，它的根就称为特征根。

##### (1) 特征根是单根的情形

设$\lambda_1,\lambda_2,\cdots,\lambda_n$是特征方程(4.21)的$n$个彼此不相等的根，则相应地方程(4.19)有如下$n$个解：
$$
\begin{align}
e^{\lambda_1 t},e^{\lambda_2 t},\cdots,e^{\lambda_n t}.\tag{4.22}
\end{align}
$$
我们指出这$n$个解在区间$a\leqslant t\leqslant b$上线性无关，从而组成方程的基本解组。事实上，这时
$$
\begin{align}
W(t)=\begin{vmatrix}
e^{\lambda_1 t} & e^{\lambda_2 t} & \cdots & e^{\lambda_n t} \\
\lambda_1e^{\lambda_1 t} & \lambda_2e^{\lambda_2 t} & \cdots & \lambda_ne^{\lambda_n t} \\
\vdots & \vdots & \ddots & \vdots \\
\lambda_1^{n-1}e^{\lambda_1 t} & \lambda_2^{n-1}e^{\lambda_2 t} & \cdots & \lambda_n^{n-1}e^{\lambda_n t}
\end{vmatrix}\\
=e^{(\lambda_1+\lambda_2+\lambda_n)t}
\begin{vmatrix}
1 & 1 & \cdots & 1 \\
\lambda_1 & \lambda_2 & \cdots & \lambda_n \\
\vdots & \vdots & \ddots & \vdots \\
\lambda_1^{n-1} & \lambda_2^{n-1} & \cdots & \lambda_n^{n-1}
\end{vmatrix}
\end{align}
$$
而最后一个行列式是著名的范德蒙德(Vandermonde)行列式，它等于$\displaystyle\prod_{1\leqslant j < i\leqslant n}^{}(\lambda_i-\lambda_j)$。假设$\lambda_i\neq\lambda_j(i\neq j)$，故此行列式不等于零，从而$W(t)\neq0$，于是解组(4.22)线性无关。<br>
如果$\lambda_i(i=1,2,\cdots,n)$均为实数，则(4.22)是方程(4.19)的$n$个线性无关的实值解，而方程(4.19)的通解可表示为
$$
x=c_1e^{\lambda_1 t}+c_2e^{\lambda_2 t}+\cdots+c_ne^{\lambda_n t}
$$
其中$c_1,c_2,\cdots,c_n$为任意常数。<br>
如果特征方程有复根，则因方程的系数是实常数，复根将成对共轭地出现。设$\lambda_1=\alpha+i\beta$是一特征根，则$\lambda_2=\alpha-i\beta$也是特征根，因而与这对共轭复根对应的，方程(4.19)有两个复值解
$$
e^{(\alpha+i\beta)t}=e^{\alpha t}(\cos\beta t+i\sin \beta t),e^{(\alpha-i\beta)t}=e^{\alpha t}(\cos\beta t-i\sin \beta t),
$$
根据定理8,他们的实部和虚部也是方程的解。这样一来，对应于特征方程的一对共轭复根$\lambda=\alpha\pm i\beta$，我们可求得方程(4.19)的两个实值解
$$
e^{\alpha t}\cos\beta t,e^{\alpha t}\sin\beta t.
$$

##### (2)特征根有重根的情形

设特征方程有$k$重根，则如所周知
$$
F(\lambda_1)=F'(\lambda_1)=\cdots=F^{(k-1)}(\lambda_1)=0,F^{(k)}\neq0.
$$
先设$\lambda_1=0$，即特征方程有因子$\lambda^k$，于是
$$
a_n=a_{n-1}=\cdots=a_{n-k+1}=0.
$$
也就是特征方程的形状为
$$
\lambda^n+a_1\lambda^{n-1}+\cdots+a_{n-k}\lambda^k=0.
$$
而对应的方程(4.19)变为
$$
\displaystyle\frac{\text{d}^nx}{\text{d}t^n}+a_1 \displaystyle\frac{\text{d}^{n-1}x}{\text{d}t^{n-1}}+\cdots+a_{n-k}\displaystyle\frac{\text{d}^kx}{\text{d}t^k}=0
$$
易见它有$k$个解$1,t,t^2,\cdots,t^{k-1}$，而且它们是线性无关的。这样一来，特征方程的$k$重零根就对应于方程(4.19)的$k$个线性无关解$1,t,t^2,\cdots,t^{k-1}$。<br>
如果这个$k$重根$\lambda_1\neq0$，我们作变量变换$x=ye^{\lambda_1 t}$，注意到
$$
x^{(m)}=(ye^{\lambda_1 t})^{(m)}=e^{\lambda_1 t}\left[y^{(m)}+m\lambda_1y^{(m-1)}+\displaystyle\frac{m(m-1)}{2!}\lambda_1^2y^{(m-2)}+\cdots+\lambda_1^my\right]
$$
可得
$$
L[ye^{\lambda_1 t}]=\left(\displaystyle\frac{\text{d}^ny}{\text{d}t^n}+b_1 \displaystyle\frac{\text{d}^{n-1}y}{\text{d}t^{n-1}}+\cdots+b_ny\right)e^{\lambda_1 t}=L_1[y]e^{\lambda_1 t}
$$
于是方程(4.19)化为
$$
\begin{align}
L_1[y]\equiv\displaystyle\frac{\text{d}^ny}{\text{d}t^n}+b_1 \displaystyle\frac{\text{d}^{n-1}y}{\text{d}t^{n-1}}+\cdots+b_{n-1}\displaystyle\frac{\text{d}y}{\text{d}t}+b_ny=0\tag{4.23}
\end{align}
$$
其中$b_1,b_2,\cdots,b_n$仍为常数，而相应的特征方程为
$$
\begin{align}
G(\mu)\equiv\mu^n+b_1\mu^{n-1}+\cdots+b_{n-1}\mu+b_n=0.\tag{4.24}
\end{align}
$$
直接计算易得
$$
G(\mu+\lambda_1)e^{(\mu+\lambda_1)t}=L[e^{(\mu+\lambda_1)t}]=L_1[e^{\mu t}]e^{\lambda_1 t}=G(\mu)e^{(\mu+\lambda_1)t}
$$
因此
$$
F(\mu+\lambda_1)=G(\mu)
$$
从而
$$
F^{(j)}(\mu+\lambda_1)=G^{(j)}(\mu),j=1,2,\cdots,k.
$$
可见(4.21)的根$\lambda=\lambda_1$对应于(4.24)的根$\mu=\mu_1=0$，而且重数相同。这样，问题就化为前面已经讨论过的情形了。<br>
我们知道，方程(4.21)的$k_1$重根对应于方程(4.23)的$k_1$个解$y=1,t^1,t^2,\cdots,t^{k_1-1}$，因而对应于特征方程(4.21)的$k_1$重根$\lambda_1$，方程(4.19)有$k_1$个解
$$
\begin{align}
e^{\lambda_1 t},te^{\lambda_1 t},t^2e^{\lambda_1 t},\cdots,t^{k_1-1}e^{\lambda_1 t}\tag{4.25}
\end{align}
$$
同样，假设特征方程(4.21)的其他根$\lambda_2,\lambda_3,\cdots,\lambda_m$的重数依次为$k_2,k_3,\cdots,k_m;(k_i\geqslant1)$(单根$\lambda_j$相当于$k_j=1$)，而且$k_1+k_2+\cdots+k_m=n,\lambda_j\neq\lambda_i(i\neq j)$，则方程(4.19)对应地有解
$$
\begin{align}
\begin{cases}
e^{\lambda_2 t},te^{\lambda_2 t},t^2e^{\lambda_2 t},\cdots,t^{k_1-1}e^{\lambda_2 t}\\
\cdots \\
e^{\lambda_m t},te^{\lambda_m t},t^2e^{\lambda_m t},\cdots,t^{k_1-1}e^{\lambda_m t}
\end{cases}\tag{4.26}
\end{align}
$$
事实上，(4.25)和(4.26)全部$n$个解线性无关，从而构成方程(4.19)的基本解组。<br>
对于特征方程有复重根的情况，譬如假设$\lambda=\alpha+i\beta$是$k$重特征根，则$\bar{\lambda}=\alpha+i\beta$也是$k$重特征根，仿(1)一样处理，我们将得到方程(4.19)的$2k$个实值解
$$
\begin{align}
&e^{\alpha t}\cos\beta t,te^{\alpha t}\cos\beta t,t^2e^{\alpha t}\cos\beta t,\cdots,t^{k-1}e^{\alpha t}\cos\beta t,\\
&e^{\alpha t}\sin\beta t,te^{\alpha t}\sin\beta t,t^2e^{\alpha t}\sin\beta t,\cdots,t^{k-1}e^{\alpha t}\sin\beta t.
\end{align}
$$

##### 欧拉方程

形状为
$$
\begin{align}
x^n \displaystyle\frac{\text{d}^ny}{\text{d}x^n}+a_1x^{n-1}\displaystyle\frac{\text{d}^{n-1}y}{\text{d}x^{n-1}}+\cdots+a_{n-1}x \displaystyle\frac{\text{d}y}{\text{d}x}+a_ny=0\tag{4.29}
\end{align}
$$
的方程称为欧拉方程，这里$a_1,a_2,\cdots,a_n$为常数。此方程可以通过变量变换化为常系数齐次线性微分方程，因而求解问题也就可以得到解决。<br>
事实上，引进自变量
$$
x=e^t,t=\ln x
$$
直接计算得到
$$
\begin{align}
\displaystyle\frac{\text{d}y}{\text{d}x}=\displaystyle\frac{\text{d}y}{\text{d}t}\cdot \displaystyle\frac{\text{d}t}{\text{d}x}&=e^{-t}\displaystyle\frac{\text{d}y}{\text{d}t}\\
\displaystyle\frac{\text{d}^2y}{\text{d}x^2}=e^{-t}\displaystyle\frac{\text{d}}{\text{d}t}\left(e^{-t}\displaystyle\frac{\text{d}y}{\text{d}t}\right)&=e^{-2t}\left(\displaystyle\frac{\text{d}^2y}{\text{d}t^2}- \displaystyle\frac{\text{d}y}{\text{d}t}\right).
\end{align}
$$
用数学归纳法不难证明：对一切自然数$k$均有关系式
$$
\displaystyle\frac{\text{d}^k}{\text{d}x^k}=e^{-kt}\left(\displaystyle\frac{\text{d}^ky}{\text{d}t^k}+\beta_1 \displaystyle\frac{\text{d}^{k-1}y}{\text{d}t^{k-1}}+\cdots+\beta_{k-1}\displaystyle\frac{\text{d}y}{\text{d}t}\right).
$$
其中$\beta_1,\beta_2,\cdots,\beta_{k-1}$都是常数。于是
$$
x^k\displaystyle\frac{\text{d}^k}{\text{d}x^k}=\displaystyle\frac{\text{d}^ky}{\text{d}t^k}+\beta_1 \displaystyle\frac{\text{d}^{k-1}y}{\text{d}t^{k-1}}+\cdots+\beta_{k-1}\displaystyle\frac{\text{d}y}{\text{d}t}.
$$
将上述关系式代入方程(4.29)，就得到常系数齐次线性微分方程
$$
\displaystyle\frac{\text{d}^ny}{\text{d}t^n}+b_1 \displaystyle\frac{\text{d}^{n-1}y}{\text{d}t^{n-1}}+\cdots+b_{n-1}\displaystyle\frac{\text{d}y}{\text{d}t}+b_ny=0.
$$
其中$b_1,b_2,\cdots,b_n$是常数，因而可用上述讨论的方法求出(4.30)的通解，再代回原来的变量(注意$t=\ln|x|$)就可求得方程(4.29)的通解。<br>
由上述推演过程，我们知道方程(4.30)有形如$y=e^{\lambda t}$的解，从而方程(4.29)有形如$y=x^{\lambda}$的解，因此可以直接求欧拉方程的形如$y=x^K$的解。以$y=x^K$代入(4.29)并约去因子$x^K$，就得到确定$K$的代数方程
$$
\begin{align}
K(K-1)\cdots(K-n+1)+a_1K(K-1)\cdots(K-n+2)+\cdots+a_n=0\tag{4.31}
\end{align}
$$
可以证明这正是方程(4.30)的特征方程。因此，方程(4.31)的$m$重实根$K=K_0$，对应于方程(4.29)的$m$个解
$$
x^{K_0},x^{K_0}\ln|x|,x^{K_0}\ln^2|x|,\cdots,x^{K_0}\ln^{m-1}|x|
$$
而方程(4.31)的$m$重复根$K=\alpha+i\beta$，对应于方程(4.29)的$2m$个实值解
$$
\begin{align}
&x^{\alpha}\cos(\beta\ln|x|),x^{\alpha}\ln|x|\cos(\beta\ln|x|),\cdots,x^{\alpha}\ln^{m-1}|x|\cos(\beta\ln|x|),\\
&x^{\alpha}\sin(\beta\ln|x|),x^{\alpha}\ln|x|\sin(\beta\ln|x|),\cdots,x^{\alpha}\ln^{m-1}|x|\sin(\beta\ln|x|).
\end{align}
$$

#### 非齐次线性微分方程，比较系数法与拉普拉斯变换法

现在讨论常系数非齐次线性微分方程
$$
\begin{align}
L[x]\equiv\displaystyle\frac{\text{d}^nx}{\text{d}t^n}+a_1\displaystyle\frac{\text{d}^{n-1}x}{\text{d}t^{n-1}}+\cdots+a_{n-1}\displaystyle\frac{\text{d}x}{\text{d}t}+a_nx=f(t)\tag{4.32}
\end{align}
$$
的求解问题，这里$a_1,a_2,\cdots,a_n$是常数，而$f(t)$为连续函数。

由于上述步骤的求解往往是比较繁琐的，而且必须经过积分运算。下面讨论当$f(t)$具有某些特殊形状时所适用的一些方法——比较系数法和拉普拉斯变换法。它们的特点是不需要通过积分而用代数方法即可求得非齐次线性微分方程的特解，比较简便。

##### (1)比较系数法

###### 类型I

设$f(t)=(b_0t^m+b_1t^{m-1}+\cdots+b_{m-1}t+b_m)e^{\lambda t}$，其中$\lambda$及$b_i(i=0,1,\cdots,m)$为实常数，那么方程(4.32)有形如
$$
\begin{align}
\tilde x=t^k(B_0t^m+B_1t^{m-1}+\cdots+B_{m-1}t+B_m)e^{\lambda t}\tag{4.33}
\end{align}
$$
的特解，其中$k$为特征方程$F(\lambda)=0$的根$\lambda$的重数(单根相当于$k=1$;当$\lambda$不是特征根时，取$k=0$)，而$B_1,B_2,\cdots,B_m$是待定常数，可以通过比较系数来确定。

1.如果$\lambda=0$，则此时
$$
f(t)=b_0t^m+b_1t^{m-1}+\cdots+b_m
$$
现在再分两种情形讨论。

(a)在$\lambda=0$不是特征根的情形，即$F(0)\neq0$，因而a_n\neq0，这时取$k=0$，以$\tilde x=B_0t^m+B_1t^{m-1}+\cdots+B_m$代入方程(4.32)，并比较$t$的同次幂的系数，得到常数$B_1,B_2,\cdots,B_m$必须满足的方程
$$
\begin{align}
\begin{cases}
B_0a_n=b_0, \\
B_1a_n+mB_0a_{n-1}=b_1,\\
B_2a_n+(m-1)B_1a_{n-1}+m(m-1)B_0a_{n-2}=b_2,\\
\cdots \\
B_ma_n+\cdots=b_m
\end{cases}\tag{4.34}
\end{align}
$$
注意到$a_n\neq0$，这些待定常数$B_1,B_2,\cdots,B_m$可以从方程(4.34)唯一地逐个确定出来。

(b)在$\lambda=0$是$k$重特征根的情形，即$F(0)=F'(0)=\cdots=F^{(k-1)}(0)=0$，而$F^{(k)}(0)\neq0$，也就是$a_n=a_{n-1}=\cdots=a_{n-k+1}=0,a_{n-k}\neq0$。这时相应地，方程(4.32)将为
$$
\begin{align}
\displaystyle\frac{\text{d}^nx}{\text{d}t^n}+a_1 \displaystyle\frac{\text{d}^{n-1}x}{\text{d}t^{n-1}}+\cdots+a_{n-k}\displaystyle\frac{\text{d}^kx}{\text{d}t^k}=f(t)\tag{4.35}
\end{align}
$$
令$\displaystyle\frac{\text{d}^kx}{\text{d}t^k}=z$，则方程(4.35)化为
$$
\begin{align}
\displaystyle\frac{\text{d}^{n-k}z}{\text{d}t^{n-k}}+a_1 \displaystyle\frac{\text{d}^{n-k-1}z}{\text{d}t^{n-k-1}}+\cdots+a_{n-k}z=f(t)\tag{4.36}
\end{align}
$$
对方程(4.36)来说，由于$a_{n-k}\neq0,\lambda=0$已不再是它的特征根。因此，由(1)知它有形如$\tilde z=\tilde B_0t^m+\tilde B_1t^{m-1}+\cdots+\tilde B_m$的特解，因而方程(4.35)有特解$\tilde x$满足
$$
\displaystyle\frac{\text{d}^k\tilde x}{\text{d}t^k}=\tilde z=\tilde B_0t^m+\tilde B_1t^{m-1}+\cdots+\tilde B_m
$$
这表明$\tilde x$是$t$的$m+k$次多项式，其中$t$的幂次$\leqslant k-1$的项带有任意常数。但因我们只需要知道一个特解就够了。我们特别地取这些常数均为零，于是我们得到方程(4.35)或方程(4.32)的一个特解
$$
\tilde x=t^k(\gamma_0 t^m+\gamma_1 t^{m-1}+\cdots+\gamma_m)
$$
这里$\gamma_0,\gamma_1,\cdots,\gamma_m$是已经确定了的常数。

2.如果$\lambda\neq0$，则此时可作变量变换$x=ye^{\lambda t}$，将方程(4.32)化为
$$
\begin{align}
\displaystyle\frac{\text{d}^ny}{\text{d}t^n}+A_1 \displaystyle\frac{\text{d}^{n-1}y}{\text{d}t^{n-1}}+\cdots+A_{n-1}\displaystyle\frac{\text{d}y}{\text{d}t}+A_ny=b_0t^m+\cdots+b_m,\tag{4.37}
\end{align}
$$
其中$A_1,A_2,\cdots,A_n$都是常数。而且特征方程(4.21)的根$\lambda$对应于方程(4.37)的特征方程的零根，并且重数也相同。因此，利用上面的结果就有如下结论：<br>
在$\lambda$不是特征方程(4.21)的根的情形，方程(4.37)有特解$\tilde y= B_0t^m+ B_1t^{m-1}+\cdots+ B_m$，从而方程(4.32)有特解$\tilde x= (B_0t^m+ B_1t^{m-1}+\cdots+ B_m)e^{\lambda t}$;<br>
在$\lambda$是特征方程(4.21)的$k$重根的情形，方程(4.37)有特解$\tilde y= t^k(B_0t^m+ B_1t^{m-1}+\cdots+ B_m)$，从而方程(4.32)有特解$\tilde x= t^k(B_0t^m+ B_1t^{m-1}+\cdots+ B_m)e^{\lambda t}$

###### 类型II
设$f(t)=[A(t)\cos\beta t+B(t)\sin\beta t]e^{\alpha t}$，其中$\alpha,\beta$为常数，而$A(t),B(t)$是带实系数$t$的多项式，其中一个的次数为$m$，而另一个的次数不超过$m$，那么我们有如下结论：方程(4.32)有形如
$$
\begin{align}
\tilde x=t^k[P(t)\cos\beta t+Q(t)\sin\beta t]e^{\alpha t}\tag{4.38}
\end{align}
$$
的特解，这里$k$为特征方程$F(\lambda)=0$的根$\alpha+i\beta$的重数，而$P(t),Q(t)$均为待定的带实系数的次数不高于$m$的$t$的多项式，可以通过比较系数法来确定。<br>
事实上，回顾一下类型I的讨论过程，易见当$\lambda$不是实数，而是复数时，有关结论仍然正确。现将$f(t)$表为指数形式
$$
f(t)=\displaystyle\frac{A(t)+iB(t)}{2}e^{(\alpha+i\beta)t}+\displaystyle\frac{A(t)+iB(t)}{2}e^{(\alpha-i\beta)t}
$$
根据非齐次线性微分方程的叠加原理，方程
$$
L[x]=f_1(t)\equiv \displaystyle\frac{A(t)+iB(t)}{2}e^{(\alpha-i\beta)t}
$$
与
$$
L[x]=f_2(t)\equiv \displaystyle\frac{A(t)+iB(t)}{2}e^{(\alpha+i\beta)t}
$$
的解之和必为方程(4.32)的解。<br>
注意到$\overline{f_1(t)}=f_2(t)$，易知，若$x_1$为$L[x]=f_1(t)$的解，则$\overline{x_1}$必为$L[x]=f_1(t)$的解。因此，直接利用类型I的结果，可知方程(4.32)有解形如
$$
\tilde x=t^kD(t)e^{(\alpha-i\beta)t}+t^k\overline{D(t)}e^{(\alpha+i\beta)t}=t^k[P(t)\cos\beta t+Q(t)\sin\beta t]e^{\alpha t}
$$
其中$D(t)$为$t$的$m$次多项式，而$P(t)=2 \text{Re}\{D(t)\},Q(t)=2 \text{Im}\{D(t)\}$。<br>
显然，$P(t),Q(t)$为带实系数的$t$的多项式，其次数不高于$m$，可见上述结论成立。

##### (2)拉普拉斯变换法

常系数线性微分方程(组)还可以应用拉普拉斯变换法进行求解，这往往比较简便。

由积分
$$
F(s)=\displaystyle\int_{0}^{+\infty}e^{-st}f(t)\text{d}t
$$
所定义的确定于复平面$\text{Re}\,s > \sigma$上的复变数$s$的函数$F(s)$，称为函数$f(t)$的拉普拉斯变换，其中$f(t)$于$t\geqslant0$上有定义，且满足不等式
$$
|f(t)| < Me^{\sigma t}
$$
这里$M,\sigma$为某两个正常数。我们将称$f(t)$为原函数，而称$F(s)$为像函数。

设给定微分方程
$$
\begin{align}
\displaystyle\frac{\text{d}^nx}{\text{d}t^n}+a_1 \displaystyle\frac{\text{d}^{n-1}x}{\text{d}t^{n-1}}+\cdots+a_nx=f(t)\tag{4.32}
\end{align}
$$
及初值条件
$$
x(0)=x_0,x'(0)=x_0',\cdots,x^{(n-1)}(0)=x_0^{(n-1)}
$$
其中$a_1,a_2,\cdots,a_n$是常数，而$f(t)$连续且满足原函数的条件。<br>
注意，如果$x(t)$是方程(4.32)的任意解，则$x(t)$及其各阶导数$x^{(k)}(t)(k=1,2,\cdots,n)$均是原函数。记
$$
\begin{align}
F(s)&=\mathscr{L}[f(t)]\equiv \displaystyle\int_{0}^{+\infty}e^{-st}f(t)\text{d}t,\\
X(s)&=\mathscr{L}[x(t)]\equiv \displaystyle\int_{0}^{+\infty}e^{-st}x(t)\text{d}t
\end{align}
$$
那么，按原函数微分性质有
$$
\begin{align}
\mathscr{L}[x'(t)]&=sX(s)-x_0,\\
\cdots\cdots\\
\mathscr{L}[x^{(n)}(t)]&=s^nX(s)-s^{n-1}x_0-s^{n-2}x_0'-\cdots-x_0^{(n-1)}
\end{align}
$$
于是，对方程(4.32)两端施行拉普拉斯变换，并利用线性性质就得到
$$
\begin{align}
&s^nX(s)-s^{n-1}x_0-s^{n-2}x_0'-\cdots-sx_0^{(n-2)}-x_0^{(n-1)}\\
&+a_1[s^{n-1}X(s)-s^{n-2}x_0-s^{n-3}x_0'-\cdots-x_0^{n-2}]\\
&+\cdots+a_{n-1}[sX(s)-x_0]+a_nX(s)=F(s)
\end{align}
$$
即
$$
\begin{align}
&(s^n+a_1s^{n-1}+\cdots+a_{n-1}s+a_n)X(s)\\
&=F(s)+(s^{n-1}+a_1s^{n-2}+\cdots+a_{n-1})x_0\\
&+(s^{n-2}+a_1s^{n-3}+\cdots+a_{n-2})x_0'+\cdots+x_0^{(n-1)}
\end{align}
$$
或
$$
A(s)X(s)=F(s)+B(s)
$$
其中$A(s),B(s)$和$F(s)$都是已知多项式，由此
$$
X(s)=\displaystyle\frac{F(s)+B(s)}{A(s)}.
$$
这就是方程(4.32)的满足所给初值条件的解的像函数。而可直接查拉普拉斯变换表或由反变换公式计算求得。<br>
拉普拉斯逆变换公式:
$$
s=\beta+jw\Rightarrow f(t)=\mathscr{L}^{-1}[F(s)]=\displaystyle\frac{1}{2\pi j}\displaystyle\int_{\beta-j\infty}^{\beta+j \infty}F(s)e^{st}\text{d}s
$$
拉普拉斯变换表：
$$
\begin{align}
&1 &&\Rightarrow \displaystyle\frac{1}{s},&&\text{Re}\;s > 0\\
&t &&\Rightarrow \displaystyle\frac{1}{s^2},&&\text{Re}\;s > 0\\
&t^n(n > -1) &&\Rightarrow \displaystyle\frac{n!}{s^{n+1}},&&\text{Re}\;s > 0\\
&e^{zt} &&\Rightarrow \displaystyle\frac{1}{s-z},&&\text{Re}\;s > \text{Re}\;z\\
&te^{zt} &&\Rightarrow \displaystyle\frac{1}{(s-z)^2},&&\text{Re}\;s > \text{Re}\;z\\
&t^ne^{ze}(n > -1) &&\Rightarrow \displaystyle\frac{n!}{(s-z)^{n+1}},&&\text{Re}\;s > \text{Re}\;z\\
&\sin\omega t &&\Rightarrow \displaystyle\frac{\omega}{s^2+\omega^2},&&\text{Re}\;s > 0\\
&\cos\omega t &&\Rightarrow \displaystyle\frac{\omega}{s^2+\omega^2},&&\text{Re}\;s > 0\\
&t\sin\omega t &&\Rightarrow \displaystyle\frac{2s\omega}{(s^2+\omega^2)^2},&&\text{Re}\;s > 0\\
&t\cos\omega t &&\Rightarrow \displaystyle\frac{s^2-\omega^2}{(s^2+\omega^2)^2},&&\text{Re}\;s > 0\\
&e^{\lambda t}\sin\omega t &&\Rightarrow \displaystyle\frac{\omega}{(s-\lambda)^2+\omega^2},&&\text{Re}\;s > \lambda\\
&e^{\lambda t}\cos\omega t &&\Rightarrow \displaystyle\frac{s-\lambda}{(s-\lambda)^2+\omega^2},&&\text{Re}\;s > \lambda\\
&te^{\lambda t}\sin\omega t &&\Rightarrow \displaystyle\frac{2\omega(s-\lambda)}{[(s-\lambda)^2+\omega^2]^2},&&\text{Re}\;s > \lambda\\
&te^{\lambda t}\cos\omega t &&\Rightarrow \displaystyle\frac{(s-\lambda)^2-\omega^2}{[(s-\lambda)^2+\omega^2]^2},&&\text{Re}\;s > \lambda\\
\end{align}
$$

#### 高阶微分方程的降阶和幂级数解法

##### 可降阶的一些方程类型

$n$阶微分方程一般地可写为
$$
F(t,x,x',\cdots,x^{(n)})=0.
$$
下面讨论三类特殊方程的降阶问题。

###### (1)方程不显含未知函数$x$

或更一般地，设方程不含$x,x',\cdots,x^{(k-1)}$，即方程呈形状
$$
\begin{align}
F(t,x^{(k)},x^{(k+1)},\cdots,x^{(n)})=0\quad(1\leqslant k\leqslant n).\tag{4.57}
\end{align}
$$
若令$x^{(k)}=y$，则方程即降为关于$y$的$n-k$阶方程
$$
\begin{align}
F(t,y,y',\cdots,y^{(n-k)})=0\quad\tag{4.58}
\end{align}
$$
如果能够求得方程(4.58)的通解
$$
y=\varphi(t,c_1,c_2,\cdots,c_{n-k})
$$
即
$$
x^{(k)}=\varphi(t,c_1,c_2,\cdots,c_{n-k})
$$
再经过$k$次积分得到
$$
x=\psi(t,c_1,c_2,\cdots,c_n)
$$
其中$c_1,c_2,\cdots,c_n$为任意常数。可以验证，这就是方程(4.57)的通解。<br>
特别地，若二阶方程不显含$x$(相当于$n=2,k=1$的情形)，则用变换$x'=y$便把方程化为一阶方程。

###### (2)不显含自变量$t$的方程

$$
\begin{align}
F(x,x',\cdots,x^{(n)})=0\tag{4.59}
\end{align}
$$
我们指出，若令$x'=y$，并以它为新未知函数，而视$x$为新自变量，则方程就可降低一阶。<br>
事实上，在所作的假定下$,x'=y,x''=\displaystyle\frac{\text{d}y}{\text{d}t}\displaystyle\frac{\text{d}y}{\text{d}x}x'=y \displaystyle\frac{\text{d}y}{\text{d}x},x'''=y \left(\displaystyle\frac{\text{d}y}{\text{d}x}\right)^2+y^2 \displaystyle\frac{\text{d}^2y}{\text{d}x^2},\cdots,$，采用数学归纳法不难证明，$x^{(k)}$可用$y,\displaystyle\frac{\text{d}y}{\text{d}x},\cdots,\displaystyle\frac{\text{d}^{k-1}y}{\text{d}x^{k-1}}$表出($k\leqslant n$)。将这些表达式代入(4.59)就得到
$$
G \left(x,y,\displaystyle\frac{\text{d}y}{\text{d}x},\cdots,\displaystyle\frac{\text{d}^{n-1}}y{\text{d}x^{n-1}}\right)=0
$$
这是关于$x,y$的$n-1$阶方程，比原方程(4.59)低一阶。

###### (3)齐次线性微分方程

$$
\begin{align}
\displaystyle\frac{\text{d}^nx}{\text{d}t^n}+a_1(t)\displaystyle\frac{\text{d}^{n-1}x}{\text{d}t^{n-1}}+\cdots+a_n(t)x=0.\tag{4.2}
\end{align}
$$
我们知道，方程的求解问题归结为寻求方程的$n$个线性无关的特解的问题，这些特解没有普遍的方法可循。<br>
但是我们指出，如果知道方程的一个非零特解，则利用变换，可将方程降低一阶；或更一般地，若知道方程的$k$个线性无关的特解，则可通过一系列同类型的变换，使方程降低$k$阶。并且得到的$n-k$阶方程也是齐次线性的。<br>
事实上，设$x_1,x_2,\cdots,x_k$是方程(4.2)的$k$个线性无关解，显然$s_i\equiv0(i=1,2,\cdots,k)$，令$x=s_ky$，直接计算可得
$$
\begin{align}
x'&=x_ky'+x'_ky,\\
x''&=x_ky''+2x_k'y'+x_k'y,\\
&\cdots\cdots\\
x^{(n)}&=x_ky^{(n)}+nx'_ky^{(n-1)}+\displaystyle\frac{n(n-1)}{2}x''_ky^{(n-2)}+\cdots+x_k^{(n)}y.
\end{align}
$$
将这些关系式代入(4.2)，得到
$$
x_ky^{(n)}+[nx_k'+a_1(t)x_k]y^{(n-1)}+\cdots+[x^{(n)}_k+a_1(t)x_k^{(n-1)}+\cdots+a_n(t)x_k]y=0,
$$
这是关于$y$的$n$阶方程，且各项系数是$t$的已知函数，而$y$的系数恒等于零，因为$x_k$是(4.2)的解。因此，如果引入新未知函数$z=y'$，并在$x_k\neq0$的区间上用$x_k$除方程的各项，我们便得到形状如
$$
\begin{align}
z^{(n-1)}+b_1(t)z^{(n-2)}+\cdots+b_{n-1}(t)z=0\tag{4.67}
\end{align}
$$
的$n-1$阶齐次线性微分方程。<br>
方程(4.67)的解与方程(4.2)的解之间的关系，由以上变换知道为$z=y'=\left(\displaystyle\frac{x}{x_k}\right)'$或$x=x_k \displaystyle\int_{}^{}z \text{d}t$。因此，对于方程(4.67)，我们就知道它的$k-1$个线性无关解$z_i=\left(\displaystyle\frac{x_i}{x_k}\right)'(i=1,2,\cdots,k-1)$。<br>
事实上，$z_1,z_2,\cdots,z_{k-1}$是方程(4.67)的解，这一点是显然的。假设这$k-1$个解之间存在关系式
$$
\alpha_1 z_1+\alpha_2z_2+\cdots+\alpha_{k-1}z_{k-1}\equiv0,
$$
或
$$
\alpha_1 \left(\displaystyle\frac{x_1}{x_k}\right)'+\alpha_2 \left(\displaystyle\frac{x_2}{x_k}\right)'+\cdots+\alpha_{k-1}\left(\displaystyle\frac{x_{k-1}}{x_k}\right)'\equiv0,
$$
其中$\alpha_1,\alpha_2,\cdots,\alpha_{k-1}$是常数。那么，就有
$$
\alpha_1 \left(\displaystyle\frac{x_1}{x_k}\right)+\alpha_2 \left(\displaystyle\frac{x_2}{x_k}\right)+\cdots+\alpha_{k-1}\left(\displaystyle\frac{x_{k-1}}{x_k}\right)\equiv-\alpha_l,
$$
或
$$
\alpha_1x_1+\alpha_2x_2+\cdots+\alpha_{k-1}x_{k-1}+\alpha_kx_k\equiv0,
$$
由于$x_1,x_2,\cdots,x_k$线性无关，故必有$\alpha_1=\alpha_2=\cdots=\alpha_k=0$。这就是说$z_1,z_2,\cdots,z_{k-1}$是线性无关的。<br>
因此，若方程(4.67)仿以上做法，令$z=z_{k-1}\displaystyle\int_{}^{}u \text{d}t$，则可将方程化为关于$u$的$n-2$阶齐次线性微分方程
$$
\begin{align}
u^{(n-2)}+c_1(t)u^{(n-3)}+\cdots+c_{n-2}(t)u=0,\tag{4.68}
\end{align}
$$
并且还知道方程(4.68)的$k-2$个线性无关解
$$
u_i=\left(\displaystyle\frac{z_i}{z_{k-1}}\right)',\quad i=1,2,\cdots,k-2.
$$
由上面的讨论我们看到，利用$k$个线性无关特解当中的一个解$x_k$，可以把方程(4.2)降低一阶，成为$n-1$阶齐次线性微分方程(4.67)，并且知道它的$k-1$个线性无关解；而利用两个线性无关解$x_{k-1},x_k$，则可以把方程(4.2)降低两阶，成为$n-2$阶齐次线性微分方程(4.68)，同时知道它的$k-2$个线性无关解。以此类推，继续上面的做法，若利用了方程的$k$个线性无关解$x_1,x_2,\cdots,x_k$，则最后我们就得到了一个$n-k$阶的齐次线性微分方程。这就是说吧方程(4.2)降低了$k$阶。<br>
特别地，对于二阶齐次线性微分方程，如果知道它的一个非零解，则方程的求解为题就解决了。<br>
事实上，设$x=x_1\neq0$是二阶齐次线性微分方程
$$
\begin{align}
\displaystyle\frac{\text{d}^2x}{\text{d}t^2}+p(t)\displaystyle\frac{\text{d}x}{\text{d}t}+q(t)x=0\tag{4.69}
\end{align}
$$
的解，则由上面讨论知道，经变换$x=x_1 \displaystyle\int_{}^{}y \text{d}t$后，方程就化为
$$
x_1 \displaystyle\frac{\text{d}y}{\text{d}t}+[2x'_1+p(t)x_1]y=0,
$$
这是一阶线性微分方程。解之得
$$
y=c \displaystyle\frac{1}{x_1^2}e^{- \int_{}^{}p(t)\text{d}t}
$$
因而
$$
\begin{align}
x=x_1[c_1+c \displaystyle\int_{}^{}\displaystyle\frac{1}{x^2_1}e^{- \int_{}^{}p(t)\text{d}t}\text{d}t],\tag{4.70}
\end{align}
$$
这里$c,c_1$是任意常数。<br>
取$c_1=0,c=1$，我们得到方程(4.69)的一个特解
$$
x=x_1 \displaystyle\int_{}^{}\displaystyle\frac{1}{x^2_1}e^{- \int_{}^{}p(t)\text{d}t}\text{d}t
$$
它与$x_1$显然是线性无关的，因为它们之比不等于常数。于是，表达式(4.70)是(4.69)的通解，它包含了方程(4.69)的所有解。

##### 二阶线性微分方程的幂级数解法

由上面讨论知道，二阶变系数齐次线性微分方程的求解问题归结为寻求它的一个非零解。由于方程的系数是自变量的函数，我们无法利用代数方法去求解。但是，从微积分中知道，在满足某些条件下，可以利用幂级数来表示一个函数。因此，可以用幂级数来表示微分方程的解。

究竟方程应该满足什么条件才能保证它的解可用幂级数来表示呢？

考虑二阶齐次线性微分方程
$$
\begin{align}
\displaystyle\frac{\text{d}^2y}{\text{d}x^2}+p(x)\displaystyle\frac{\text{d}y}{\text{d}x}+q(x)y=0\tag{4.72}
\end{align}
$$
及初值条件$y(x_0)=y_0$及$y'(x_0)=y'_0$的情况。<br>
不失一般性，可设$x_0=0$，否则，我们引进新变量$t=x-x_0$，经此变换，方程的形状不变，但这时对应于$x=x_0$的就是$t=0$了。因此，今后我们总认为$x_0=0$。

定理10 <br>
若方程(4.72)中系数$p(x)$和$q(x)$都能展成$x$的幂级数，且收敛区间为$|x| < R$，则方程(4.72)有形如
$$
\begin{align}
y=\displaystyle\sum_{n=0}^{\infty}a_nx^n\tag{4.73}
\end{align}
$$
的特解，也以$|x| < R$为级数的收敛区间。

##### 但有些方程，例如$n$阶贝塞尔方程
$$
\begin{align}
x^2 \displaystyle\frac{\text{d}^2y}{\text{d}x^2}+x \displaystyle\frac{\text{d}y}{\text{d}x}+(x^2-n^2)y=0\tag{4.74}
\end{align}
$$
这里$n$为非负常数，不一定是正整数。显然它不满足定理10的条件，因而不能肯定有形如(4.73)的特解。但它满足下述定理11的条件，从而具有别种形状的幂级数解。

定理11 <br>
若方程(4.72)中系数$p(x),q(x)$具有这样的性质，即$xp(x)$和$x^2p(x)$均能展成的幂级数，且收敛区间为$|x| < R$，若$a_0\neq0$，则方程(4.72)有形如
$$
y=x^{\alpha}\displaystyle\sum_{n=0}^{\infty}a_nx^n
$$
即
$$
\begin{align}
y=\displaystyle\sum_{n=0}^{\infty}a_nx^{\alpha+n}\tag{4.75}
\end{align}
$$
的特解，$\alpha$是一个待定的常数。级数(4.75)也以$|x| < R$为收敛区间。若$a_0=0$，或更一般地$a_i=0(i=0,1,2,\cdots,m-1)$，但$a_m\neq0$，则引入记号$\beta=\alpha+m,b_k=a_{m+k}$，则
$$
y=x^{\alpha}\displaystyle\sum_{n=m}^{\infty}a_nx^n=x^{\alpha+m}\displaystyle\sum_{k=0}^{\infty}a_{m+k}x^k=x^{\beta}\displaystyle\sum_{k=0}^{\infty}b_kx^k,
$$
这里$b_0=a_m\neq0$，而$\beta$仍为待定常数。

定义函数$\Gamma(s)$如下：
$$
\begin{cases}
\Gamma(s)=\displaystyle\int_{0}^{+ \infty}s^{s-1}e^{-x}\text{d}x, &s > 0\\
\Gamma(s)=\displaystyle\frac{1}{s}\Gamma(s+1), &s < 0 \text{且非整数}
\end{cases}
$$

定义：
$$
J_n(x)\equiv y_1=\displaystyle\sum_{k=0}^{\infty}\displaystyle\frac{(-1)^k}{k!\Gamma(n+k+1)}\left(\displaystyle\frac{x}{2}\right)^{2k+n}
$$
称为$n$阶贝塞尔函数。
$$
J_{-n}(x)\equiv y_2=\displaystyle\sum_{k=0}^{\infty}\displaystyle\frac{(-1)^k}{k!\Gamma(-n+k+1)}\left(\displaystyle\frac{x}{2}\right)^{2k-n}
$$
称为$-n$阶贝塞尔函数。

于是方程(4.74)的通解可写为
$$
y=c_1J_n(x)+c_2J_{-n}(x)
$$
这里$c_1,c_2$是任意常数。此情形的$J_n(x)$和$J_{-n}(x)$称为第一类贝塞尔函数。

当$n$为自然数时，虽然仍可求出$a_{2k}(k=n+1,n+2,\cdots),a_{2n}$任意，但容易验证，由此得到的$J_n(x)$和$J_{-n}(x)$线性相关，为了求出与$J_n(x)$和$J_{-n}(x)$线性无关的另一个特解，要用其他方法，所求得的特解称为第二类贝塞尔函数，在此不作深入介绍。

### 线性微分方程组










