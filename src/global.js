
class CarolTree{

	constructor(){
		this.treeGo=false;
		// this.w = $(window).width()
        // this.h = $(window).height()
        this.start=1;
        this.end = 100;
		this.space=10// 每隔多少毫秒出现一张
		this.moveSpeed=5// 移动间隔
		this.list=[]// 等待队列
		this.tree=[]// 树型数组
		this.color=['#000']// 颜色列表
		this.speedY=[1,2,3]// y轴速度
		this.speedX=[-2,-1,0,0,1,2] // x轴速度
		this.size=[14]// 大小列表
		this.bMonth=12
		this.bDay=15
		this.init()
	}

	init(){
		this.treeGo=true;
		// this.startTreeAnimate()
		this.startTimeAnimate()
	}

	startTreeAnimate(){
		if(this.treeGo===false)return
		const len = 50;
		if(this.list.length<=len){
			for(var i =0;i<len;i++)	{
				this.pushList()
			}
		}
		var dom = this.createTreeDom()
        this.treeMove(dom)

		setTimeout(()=>{
			this.startTreeAnimate()
		},this.space)
	}

	treeMove(dom){
		var oDiv = $(dom)
		var speedY = parseInt(oDiv.attr('speedY'))
		var speedX = parseInt(oDiv.attr('speedX'))
		var top = parseInt(oDiv.css('top'))
		var left = parseInt(oDiv.css('left'))
		left += speedX
		top += speedY
		oDiv.css({'top':top+'px','left':left+'px'})
		var isgo = this.isContinueRemove(dom)// 检测是否在可视范围内
		if(isgo===false){
			oDiv.remove()
		}else{
			setTimeout(()=>{
				this.treeMove(dom)
			},this.moveSpeed)
		}
	}

	isContinueRemove(dom){
		var oDiv =$(dom)
		var w = parseFloat(oDiv.width())
		var left = parseFloat(oDiv.css('left'))
		var top = parseFloat(oDiv.css('top'))
		var x = w + left
		if(x<0 || top>this.h){
			return false
		}
        return true
		
	}

	pushList(){// 加入等待列表
		var obj = {
			tree : this.selectAny(this.tree),
			speedY : this.selectAny(this.speedY),
			speedX : this.selectAny(this.speedX),
			color : this.selectAny(this.color),
			size : this.selectAny(this.size)
		}
		this.list.push(obj)
	}

	createTreeDom (){// 创建dom元素
		var list = this.list
		var dom;
		if(list.length===0) return false
		var obj = list.splice(0,1)
		return dom
	}

	selectAny(list){
		var n = Math.ceil(Math.random()*list.length);
		return list[n];
	}

	stopTreeAnimate(){
		this.treeGo=false
	}

	startTimeAnimate(){
		
	}

	getResDateStr(arr){
        if(!(arr instanceof Array)){
            arr = this.getResDate();
        }
		var day = arr[0]
		var hour = arr[1]
		var min = arr[2]
		var second = arr[3]
        var res = `${day}天${hour}时${min}分${second}秒`
		return res
	}

	getResDate(){
		var date = new Date()
		var currentYear = date.getFullYear()
		var currentMon = date.getMonth()+1
		var currentDay = date.getDate()
		if(currentMon>this.bMonth){
			currentYear++
		}
		if(currentMon === this.bMonth && currentDay>=this.bDay){
			currentYear++
		}
		var str = `${currentYear}-${this.bMonth}-${this.bDay} 00:00:00`
		var bTimestamp = new Date(str).getTime();
		var tmp = bTimestamp - (new Date().getTime())
		var day = parseInt(tmp/86400000);
		tmp = tmp%86400000
		var hour = parseInt(tmp/3600000)
		tmp = tmp%3600000
		var min = parseInt(tmp/60000)
		tmp = tmp%60000
		var second = parseInt(tmp/1000)
		return [day,hour,min,second]
    }

    getImgSource(){
        var start = this.start;
        var end = this.end
        while(start<=end){
            var str = `<img src='./source/${start}.jpg' style="display:none">`
            $("#img_source").append(str);
            start++
        }
    }

    renderImage(){
        var start = this.start;
        var end = this.end;

        var render = ()=>{
            $('#img').css('background-image',`url(./source/${start}.jpg)`)
            start++;
            if(start==end){
                start=this.start;
            }
            setTimeout(() => {
                render()
            }, 100)
        }
        render()
    }

}

new CarolTree()

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}