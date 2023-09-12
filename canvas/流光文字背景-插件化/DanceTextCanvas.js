class DanceTextCanvas {

  constructor(option) {
    this.canvas = null;   // canvasDOM
    this.ctx = null;    // canvas DOM 上下文对象
    this.timer = null;    // setInterval 标记
    this.elId = option?.elId || "canvas";     // 绑定的canvas元素id, 默认canvas
    this.width = option?.width * devicePixelRatio || window.innerWidth * devicePixelRatio;    // canvas宽度, 默认窗口宽度
    this.height = option?.height * devicePixelRatio || window.innerHeight * devicePixelRatio;     // canvas高度, 默认窗口高度
    this.fontSize = option?.fontSize * devicePixelRatio || 16 * devicePixelRatio;     // 字体大小, 默认20
    this.fontFamily = option?.fontFamily || "Roboto Mono";     // 字体种类, 默认"Roboto Mono"
    this.backColor = option?.backColor || "rgba(0, 0, 0, .1)";    // 背景颜色, 默认rgba(0,0,0,.1)
    this.randomTextStr = option?.randomTextStr || "永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭，修禊事也。群贤毕至，少长咸集。此地有崇山峻岭，茂林修竹；又有清流激湍，映带左右，引以为流觞曲水，列坐其次。虽无丝竹管弦之盛，一觞一咏，亦足以畅叙幽情。是日也，天朗气清，惠风和畅，仰观宇宙之大，俯察品类之盛，所以游目骋怀，足以极视听之娱，信可乐也。夫人之相与，俯仰一世，或取诸怀抱，悟言一室之内；或因寄所托，放浪形骸之外。虽趣舍万殊，静躁不同，当其欣于所遇，暂得于己，怏然自足，不知老之将至。及其所之既倦，情随事迁，感慨系之矣。向之所欣，俯仰之间，已为陈迹，犹不能不以之兴怀。况修短随化，终期于尽。古人云：“死生亦大矣。”岂不痛哉！每览昔人兴感之由，若合一契，未尝不临文嗟悼，不能喻之于怀。固知一死生为虚诞，齐彭殇为妄作。后之视今，亦犹今之视昔。悲夫！故列叙时人，录其所述，虽世殊事异，所以兴怀，其致一也。后之览者，亦将有感于斯文。";    // 随即文字字符串, 默认兰亭序
    this.randomColorArr = option?.randomColorArr || [ "#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000" ];     // 随即文字颜色数组, 默认[ "#33B5E5", "#0099CC", "#AA66CC", 等 ]
    this.animationSpeed = option?.animationSpeed || 40;     // 动画速度, 默认40ms
    this.columnWidth = option?.columnWidth * devicePixelRatio || 30 * devicePixelRatio;    // 列宽, 默认30
    this.columnCount = "";    // 列数
    this.columnNextIndexs = "";   // 记录每列写到第几个数字
  }

  // 创建初始化并在dom插入canvas元素, 设置id宽高等属性
  createCanvasEl() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = this.elId;
    this.canvas.style.cssText = `position:fixed; top:0; left:0; width:${!this.isSetSize ? this.width/devicePixelRatio+"px" : "100%"}; height:${!this.isSetSize ? this.height/devicePixelRatio+"px" : "100%"}; z-index:-999;`;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
  }

  // 事件绑定
  bindEvent() {
    window.addEventListener("resize", this.debounce(this.resetHandle, 500), false);
  }

  // 设置canvas界面大小,列数
  setSize() {
    // canvas元素宽度
    this.canvas.width = this.width;
    // canvas元素高度
    this.canvas.height = this.height;
    // 列数
    this.columnCount = Math.floor(this.width / this.columnWidth);
    // 记录每列写到第几个数字
    this.columnNextIndexs = new Array(this.columnCount).fill(1);
  }

  // 绘制函数
  draw() {
    // 绘制白色透明背景样式和配置
    this.ctx.fillStyle = `${this.backColor}`;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // 绘制彩色文字样式和配置
    this.ctx.fillStyle = this.getRandomColor();
    this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    // 绘制文字
    for (let i = 0; i < this.columnCount; i++) {
      // 定义文字x y轴
      let x = i * this.columnWidth;
      let y = this.columnNextIndexs[i] * (this.fontSize + 4);
      this.ctx.fillText(this.getRandomText(), x, y);
      // y超出canvas归零
      if (y > this.height && Math.random() > .99) {
        this.columnNextIndexs[i] = 0;
      } else {
        this.columnNextIndexs[i] ++;
      }
    }
  }

  // 窗口变化处理函数
  resetHandle(e, self) {
    // 设置宽高
    self.width = e.currentTarget.innerWidth * devicePixelRatio;
    self.height = e.currentTarget.innerHeight * devicePixelRatio;
    self.setSize();
    // 重新绘制
    clearInterval(self.timer);
    self.timer = setInterval(() => self.draw(), self.animationSpeed);
  }

  // 防抖函数
  debounce(fn, delay = 300) {
    let timer;
    let self = this;
    return function() {
      let context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, [...args, self]);
      }, delay);
    }
  }

  // 随机颜色函数
  getRandomColor() {
    return this.randomColorArr[Math.floor(Math.random() * this.randomColorArr.length)];
  }

  // 随机文字函数
  getRandomText() {
    return this.randomTextStr[Math.floor(Math.random() * this.randomTextStr.length)];
  }

  get isSetSize() {
    return this.width === window.innerWidth * devicePixelRatio && this.height === window.innerHeight * devicePixelRatio;
  }

  init() {
    // 创建canvas
    this.createCanvasEl();
    // 没设置宽或者高的时候绑定事件
    console.log("init: ", this.isSetSize)
    this.isSetSize && this.bindEvent();
    // 设置大小
    this.setSize();
    // 启动绘制
    this.timer = setInterval(() => this.draw(), this.animationSpeed);
  }

}