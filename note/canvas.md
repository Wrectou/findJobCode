### canvas学习记录

##### 1、基本信息

canvas是一个可以使用脚本来绘制图形的`HTML`元素，它可以用于绘制图表、制作图片构图或者制作简单的动画。

- 默认大小为300*150，可以通过`width、height`来设置大小；
- `canvas`只支持两种形式的图形绘制：矩形和路径（由一系列点连成的线段）。所有其他类型的图形都是通过一条或者多条路径组合而成的。

##### 2、绘制矩形

> [`fillStyle = color`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillStyle)：设置图形的填充颜色。默认#000。
>
> [`strokeStyle = color`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeStyle)：设置图形轮廓（边框）的颜色，默认#000。
>
> [`fillRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect)：绘制一个填充的矩形。
>
> [`strokeRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeRect)：绘制一个矩形的边框。
>
> [`clearRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearRect)：清除指定矩形区域，让清除部分完全透明。

##### 3、绘制路径

> 1. 首先，你需要创建路径起始点。
> 2. 然后你使用[画图命令](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#paths)去画出路径。
> 3. 之后你把路径封闭。
> 4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。
>
> [`beginPath()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/beginPath)：新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
>
> [`closePath()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/closePath)：闭合路径之后图形绘制命令又重新指向到上下文中。
>
> [`stroke()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/stroke)：通过线条来绘制图形轮廓。
>
> [`fill()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fill)：通过填充路径的内容区域生成实心的图形。

##### 4、移动笔触

> [`moveTo(x, y)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/moveTo)：将一个新的子路径的起始点移动到 (x，y) 坐标的方法。

