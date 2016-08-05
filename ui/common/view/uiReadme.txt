
已有的UI组件：
1. 下拉列表（DataList)
2. 纵向菜单列表(MenuList)
3. 横向菜单(TabBar)
3. 自动分页列表(PageDataList)
4. 进度条（血条）(ProgressBar)
5. 勾选按钮(CheckButton)
6. 滚动容器组件(UIScroller)
7. 面板外框(TitlePanel)

8. BitmapIcon  BitmapGrid
9. tooltip 

//////////////////////////////////////////
///
//  ui面板上禁用Tooltip文本事件，将下列代码拷贝到主面板的动作帧上
//

import flash.display.MovieClip;
import flash.display.DisplayObject;
import flash.text.TextField;
import flash.text.TextFieldType;

stop();
setEnable(this);

function setEnable(mc:MovieClip):void
{
	var num:int = mc.numChildren;
	var element:DisplayObject;
	var tf:TextField;
	for(var i:int = 0; i < num; i++)
	{
		element = mc.getChildAt(i);
		if(element is MovieClip)
		{
			setEnable(element as MovieClip);
		}
		else if(element is TextField)
		{
			tf = element as TextField;
			if(tf.type == TextFieldType.DYNAMIC)
			{
				tf.selectable = false;
				tf.mouseWheelEnabled = false;
			}
			tf.tabEnabled = false;
		}
	}
}