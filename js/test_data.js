// Load after car-view-control.js
/**
 * 初始化数据：
 * 1. area 多边形数据
 * 2. 零件位置信息
 * 3. 零件尺寸信息
 */
function initialize(){
	// 零件中文名
	partMap    ["component-1"] = "前保险杠";
	partMap    ["component-2"] = "前车盖";
	partMap    ["component-3"] = "车顶";
	partMap    ["component-4"] = "左前门";
	partMap    ["component-5"] = "左前翼子板";
	partMap    ["component-6"] = "左后门";
	partMap    ["component-7"] = "左后翼子板";
	partMap    ["component-8"] = "左后视镜";
	partMap    ["component-9"] = "左裙边";
	partMap    ["component-10"] = "后保险杠";
	partMap    ["component-11"] = "后车盖";
	partMap    ["component-12"] = "右后门";
	partMap    ["component-13"] = "右后视镜";
	partMap    ["component-14"] = "右后翼子板";
	partMap    ["component-15"] = "右前门";
	partMap    ["component-16"] = "右前翼子板";
	partMap    ["component-17"] = "右裙边";
	partMap    ["component-18"] = "整车";
	
	// area 多边形数据
	matrixMap  ["component-1-view-1"] = new Array(92,221,93,229,97,235,97,241,142,252,199,260,207,260,225,255,270,253,310,246,328,238,337,247,344,248,370,244,361,267,357,294,356,319,299,330,213,333,171,327,137,320,93,305,86,297,85,290,88,287,88,254,86,250,87,234,89,234);
	matrixMap  ["component-1-view-4"] = new Array(379,244,398,248,408,248,421,236,441,245,488,252,521,256,539,260,652,239,653,233,655,221,659,232,663,235,663,249,659,254,660,290,664,292,658,304,630,314,556,329,523,333,448,329,392,318,390,280);
 
	// 零件位置信息
	positionMap["component-1-view-1"] = new point(86,219);
	positionMap["component-1-view-4"] = new point(374,219);
 
	
	// 零件尺寸信息
	sizeMap    ["component-1-view-1"] = new size(289, 116);
	sizeMap    ["component-1-view-4"] = new size(289, 116); 
}
