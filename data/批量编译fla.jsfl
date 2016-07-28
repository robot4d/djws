//----------------------------------Start--------------------------------
//Brent Arnold's kick butt batch folder publishing script 
//Created June 7, 2006 
//Version 1.0 
//modifier nino
//modified Apirl 21, 2010

// 记录开始时间
var startTime = new Date().getTime();
// 定义数组存放fla文件路径
var folderFlas = [];
// 要删除的发布后产生的多余文件的后缀名
var deleteSuffixes = ["html"];

// 打开指定文件夹下的所有fla文件
var folderURI = fl.browseForFolderURL("请选择一个文件夹, 点击确定后开始批量编译, 如fla文件数较多则需花费较长时间, 请耐心等待!");
var folderContents = FLfile.listFolder(folderURI);

// 遍历文件夹下所有文件
for(var i = 0; i < folderContents.length; i++)
{
    var fileURL = folderURI + "/" + folderContents[i];
    // 检查是否是fla文件
    if(fileURL.substr(fileURL.length-4, 4) == ".fla")
    {
        folderFlas.push(fileURL);
        fl.openDocument(fileURL);
    }
}

// 编译SWF
while(fl.getDocumentDOM() != null)
{
    // 使用当前的发布设置而不弹出发布对话框
    // 请在批量编译之前确定每个文件的发布设置是否设置正确
    fl.getDocumentDOM().publish();
    
    // 保存文件
    fl.saveDocument(fl.getDocumentDOM());
    // 关闭文件
    fl.closeDocument(fl.getDocumentDOM());
}

// 删除发布时产生的文件
for each(var flaURL in folderFlas)
{
    flaURL = flaURL.substr(0, flaURL.length - 3);
    for each(var deleteSuffix in deleteSuffixes)
    {
        var deleteURL = flaURL + deleteSuffix;
        FLfile.remove(deleteURL);
    }
}

// 记录完成时间
var endTime = new Date().getTime();

// 打印编译信息
if(fl.getDocumentDOM() == null)
{
    fl.trace("编译文件列表");
    fl.trace("-------------------------------");
    for(var a = 0; a < folderFlas.length; a++)
    {
        fl.trace(folderFlas[a]);
    }
    fl.trace("-------------------------------");
    fl.trace("成功编译[" + folderFlas.length + "]个文件");
    fl.trace("耗时[" + ((endTime - startTime) / 1000) + "]秒");
}
//----------------------------------End--------------------------------
