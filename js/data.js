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
	
	// 零件所属视图面
	partAtWhichViewMap    ["component-1"] = "1";
	partAtWhichViewMap    ["component-2"] = "1";
	partAtWhichViewMap    ["component-3"] = "1";
	partAtWhichViewMap    ["component-4"] = "1";
	partAtWhichViewMap    ["component-5"] = "1";
	partAtWhichViewMap    ["component-6"] = "1";
	partAtWhichViewMap    ["component-7"] = "1";
	partAtWhichViewMap    ["component-8"] = "1";
	partAtWhichViewMap    ["component-9"] = "1";
	partAtWhichViewMap    ["component-10"] = "3";
	partAtWhichViewMap    ["component-11"] = "3";
	partAtWhichViewMap    ["component-12"] = "3";
	partAtWhichViewMap    ["component-13"] = "3";
	partAtWhichViewMap    ["component-14"] = "3";
	partAtWhichViewMap    ["component-15"] = "3";
	partAtWhichViewMap    ["component-16"] = "3";
	partAtWhichViewMap    ["component-17"] = "3";
	partAtWhichViewMap    ["component-18"] = "1";
	
	
	
	// area 多边形数据
	matrixMap  ["component-1-view-1"] = new Array(92,221,93,229,97,235,97,241,142,252,199,260,207,260,225,255,270,253,310,246,328,238,337,247,344,248,370,244,361,267,357,294,356,319,299,330,213,333,171,327,137,320,93,305,86,297,85,290,88,287,88,254,86,250,87,234,89,234);
	matrixMap  ["component-1-view-4"] = new Array(379,244,398,248,408,248,421,236,441,245,488,252,521,256,539,260,652,239,653,233,655,221,659,232,663,235,663,249,659,254,660,290,664,292,658,304,630,314,556,329,523,333,448,329,392,318,390,280);
	
	matrixMap  ["component-2-view-1"] = new Array(214,139,194,148,166,157,132,172,114,184,100,203,121,211,144,214,150,210,154,211,158,213,161,216,199,220,241,220,292,215,332,209,340,200,373,188,411,174,412,157,408,151,325,149,257,144,224,142);
	matrixMap  ["component-2-view-2"] = new Array(102,98,113,98,133,105,133,99,139,94,150,89,157,89,188,69,162,78,131,85,113,91);
	matrixMap  ["component-2-view-3"] = new Array(568,73,593,81,616,86,629,90,640,96,634,97,616,103,616,100,613,96,602,91,591,88);
	matrixMap  ["component-2-view-4"] = new Array(336,158,340,150,427,148,520,142,533,140,545,145,601,166,632,183,643,194,647,203,605,214,599,212,590,213,586,217,529,222,456,216,413,208,407,201,362,185,336,175);
	
	matrixMap  ["component-3-view-1"] = new Array(312,80,347,69,386,63,436,60,499,62,526,64,563,70,587,80,613,100,614,106,609,107,603,100,574,82,555,76,514,76,485,87,467,104,450,130,443,145,441,154,442,164,412,175,412,157,409,151,420,144,433,129,468,85,469,82,416,78,368,76,334,77);
	matrixMap  ["component-3-view-2"] = new Array(160,92,157,88,190,68,232,55,276,48,350,42,408,46,469,59,503,74,535,98,508,93,391,104,366,110,358,114,341,118,326,128,306,103,280,83,242,67,216,66,190,76);
	matrixMap  ["component-3-view-3"] = new Array(213,98,238,77,303,51,359,43,424,43,484,49,530,59,558,69,589,88,586,91,555,76,534,67,505,67,468,81,444,100,421,127,405,118,389,115,357,104,252,93);
	matrixMap  ["component-3-view-4"] = new Array(139,108,134,107,134,102,162,80,186,69,258,61,340,61,378,64,413,71,434,79,425,77,398,76,279,82,277,83,305,115,320,137,327,143,340,151,336,158,335,175,306,165,305,150,294,125,273,96,264,88,251,81,235,77,225,76,197,76,178,80,161,88,144,100);
	
	matrixMap  ["component-4-view-1"] = new Array(442,164,443,161,448,161,453,161,457,159,462,157,480,157,499,154,508,146,510,141,540,133,550,156,552,176,550,185,550,192,551,229,552,235,551,242,453,277,453,203,451,176,447,167);
	matrixMap  ["component-4-view-2"] = new Array(145,114,152,114,156,112,224,135,215,149,212,155,209,164,209,165,207,202,206,221,208,227,209,239,210,242,140,203,139,196,138,132);
	
	matrixMap  ["component-5-view-1"] = new Array(330,237,338,245,351,246,371,242,386,223,403,212,413,211,422,214,435,225,442,239,444,252,445,263,445,280,451,277,452,207,449,177,447,172,442,166,354,196,344,201,337,205,335,208,350,207,353,210,353,214,350,221,341,230);
	matrixMap  ["component-5-view-2"] = new Array(90,145,90,128,91,121,99,105,104,99,113,99,132,106,135,111,143,115,136,131,135,180,133,167,127,149,120,133,114,125,107,121,100,122,96,127); 
	
	matrixMap  ["component-6-view-1"] = new Array(542,132,607,114,610,117,613,122,618,134,618,141,616,149,606,169,602,180,600,194,597,214,595,224,552,241,553,237,552,201,552,184,554,170,554,158);
	matrixMap  ["component-6-view-2"] = new Array(226,136,322,168,306,180,289,201,278,222,273,236,270,252,270,268,271,276,214,245,211,239,211,228,209,219,209,208,210,203,210,168,214,160,215,154); 
	
	matrixMap  ["component-7-view-1"] = new Array(609,113,610,109,615,108,616,104,626,110,632,112,637,113,646,118,647,120,655,126,657,129,658,134,658,150,657,155,660,159,656,165,654,168,646,173,644,169,641,165,635,161,630,161,624,164,619,170,612,183,608,195,603,213,601,224,598,224,601,208,603,195,605,183,610,169,619,151,621,142,622,136,615,121,613,116);
	matrixMap  ["component-7-view-2"] = new Array(276,280,273,278,272,256,280,223,302,188,334,161,337,148,328,129,342,120,355,117,352,122,386,175,395,185,435,212,446,222,393,214,385,216,390,239,395,246,403,250,399,261,390,262,326,249,311,232,303,227,286,232,277,254);
	
	matrixMap  ["component-8-view-1"] = new Array(458,127,447,147,447,158,454,159,462,155,500,151,508,143,507,138,492,132,473,130,462,137);
	matrixMap  ["component-8-view-2"] = new Array(176,86,160,98,160,93,157,90,141,95,134,100,134,105,139,111,151,113,156,110,166,109); 
	
	matrixMap  ["component-9-view-1"] = new Array(445,283,582,232,594,226,599,226,597,234,588,242,443,300);
	matrixMap  ["component-9-view-2"] = new Array(138,207,137,205,140,205,276,282,277,290,139,208); 
	
	matrixMap  ["component-10-view-1"] = new Array(646,175,655,169,659,163,658,175,645,210,647,186);
	matrixMap  ["component-10-view-2"] = new Array(327,252,389,264,400,263,405,251,425,258,477,259,489,275,572,267,630,257,640,238,658,229,660,247,665,255,658,305,650,312,640,324,477,349,411,349,359,338,349,326,336,273);
	matrixMap  ["component-10-view-3"] = new Array(91,230,107,238,118,257,254,275,261,272,270,260,320,258,343,252,347,262,353,265,421,251,400,316,399,323,386,340,329,350,263,349,112,325,91,308,81,258,89,244);
	matrixMap  ["component-10-view-4"] = new Array(87,160,89,179,102,213,102,176);
	 
	matrixMap  ["component-11-view-2"] = new Array(395,183,513,178,598,165,601,161,647,192,646,197,622,217,615,235,619,240,638,238,627,256,491,275,479,259,507,256,513,249,504,235,489,229,449,222,438,211,412,196,397,183);
	matrixMap  ["component-11-view-3"] = new Array(146,161,149,166,165,170,285,183,351,183,308,212,298,223,253,230,235,250,241,257,268,259,256,274,120,256,110,239,124,241,130,240,133,235,125,217,101,198,102,192,134,171); 
	 
	matrixMap  ["component-12-view-3"] = new Array(425,169,441,180,463,209,475,237,478,257,476,278,534,245,537,237,537,227,539,218,538,205,537,167,534,159,532,153,522,136);
	matrixMap  ["component-12-view-4"] = new Array(140,115,136,118,128,135,131,150,143,174,147,192,151,224,195,241,194,236,195,187,193,170,194,157,205,132);
	 
	matrixMap  ["component-13-view-3"] = new Array(570,87,582,110,591,110,594,113,603,114,610,111,615,105,614,99,608,95,591,90,588,92,590,98);
	matrixMap  ["component-13-view-4"] = new Array(289,127,286,137,277,131,254,132,241,136,239,142,244,150,268,156,286,155,293,159,300,159,301,149);
	 
	matrixMap  ["component-14-view-3"] = new Array(300,223,311,213,332,200,355,182,395,125,395,119,392,116,420,129,412,145,413,158,414,161,441,183,461,210,472,235,476,252,475,279,472,280,471,250,464,234,456,228,444,228,432,237,423,249,402,253,353,263,348,261,344,251,353,245,362,228,362,218,359,214,349,214);
	matrixMap  ["component-14-view-4"] = new Array(114,162,106,167,103,174,87,160,91,157,90,126,107,113,133,102,133,107,139,109,139,113,127,137,130,151,138,169,145,190,151,224,148,224,136,182,123,163);
	 
	matrixMap  ["component-15-view-3"] = new Array(523,135,591,112,597,115,602,115,609,133,608,202,536,244,539,239,539,227,540,220,539,169,536,157,535,152);
	matrixMap  ["component-15-view-4"] = new Array(198,189,195,175,196,158,208,133,238,141,240,147,247,153,268,157,285,157,289,159,296,162,301,161,305,161,305,164,299,171,294,196,295,277,196,241,196,235);
	 
	matrixMap  ["component-16-view-3"] = new Array(610,186,610,131,604,115,609,113,613,108,616,105,635,99,644,99,658,124,658,151,650,127,643,123,633,127,624,141);
	matrixMap  ["component-16-view-4"] = new Array(306,166,301,171,299,177,296,198,295,277,303,280,303,256,309,232,319,218,334,211,345,212,362,225,375,243,397,246,407,246,418,237,403,228,396,220,394,211,397,207,413,209,408,203,395,197);
	 
	matrixMap  ["component-17-view-3"] = new Array(470,282,608,205,611,205,608,208,470,291);
	matrixMap  ["component-17-view-4"] = new Array(148,227,153,227,303,283,305,297,301,298,290,296,161,243,151,236);
	
	matrixMap  ["component-18-view-1"] = new Array();
	matrixMap  ["component-18-view-2"] = new Array();
	matrixMap  ["component-18-view-3"] = new Array();
	matrixMap  ["component-18-view-4"] = new Array();
	
	// 零件位置信息
	positionMap["component-1-view-1"] = new point(86,219);
	positionMap["component-1-view-4"] = new point(374,219);
	
	positionMap["component-2-view-1"] = new point(99,137);
	positionMap["component-2-view-2"] = new point(103,68);
	positionMap["component-2-view-3"] = new point(559,68);
	positionMap["component-2-view-4"] = new point(335,137);
	
	positionMap["component-3-view-1"] = new point(215,59);
	positionMap["component-3-view-2"] = new point(154,41);
	positionMap["component-3-view-3"] = new point(208,41);
	positionMap["component-3-view-4"] = new point(133,59);
	
	positionMap["component-4-view-1"] = new point(442,130);
	positionMap["component-4-view-2"] = new point(136,110);  
	
	positionMap["component-5-view-1"] = new point(328, 164);
	positionMap["component-5-view-2"] = new point(89.3, 96); 
	
	positionMap["component-6-view-1"] = new point(541, 113);
	positionMap["component-6-view-2"] = new point(207, 133); 
	
	positionMap["component-7-view-1"] = new point(596, 100);
	positionMap["component-7-view-2"] = new point(270, 113);
	
	positionMap["component-8-view-1"] = new point(445, 126);
	positionMap["component-8-view-2"] = new point(133, 85); 
	
	positionMap["component-9-view-1"] = new point(443, 223);
	positionMap["component-9-view-2"] = new point(137, 202); 
	
	positionMap["component-10-view-1"] = new point(644, 157);
	positionMap["component-10-view-2"] = new point(325, 226);
	positionMap["component-10-view-3"] = new point(80, 226);
	positionMap["component-10-view-4"] = new point(86, 156);
	 
	positionMap["component-11-view-2"] = new point(393, 158);
	positionMap["component-11-view-3"] = new point(100, 158); 
	 
	positionMap["component-12-view-3"] = new point(423, 133);
	positionMap["component-12-view-4"] = new point(128, 113);
	 
	positionMap["component-13-view-3"] = new point(570, 85);
	positionMap["component-13-view-4"] = new point(238, 126);
	 
	positionMap["component-14-view-3"] = new point(298, 113);
	positionMap["component-14-view-4"] = new point(87, 100);
	 
	positionMap["component-15-view-3"] = new point(522, 110);
	positionMap["component-15-view-4"] = new point(194, 130);
	 
	positionMap["component-16-view-3"] = new point(602, 95);
	positionMap["component-16-view-4"] = new point(295, 164);
	 
	positionMap["component-17-view-3"] = new point(471, 201);
	positionMap["component-17-view-4"] = new point(147, 223);
	
	positionMap["component-18-view-1"] = new point(86, 59);
	positionMap["component-18-view-2"] = new point(89, 41);
	positionMap["component-18-view-3"] = new point(80, 41);
	positionMap["component-18-view-4"] = new point(86, 59);
	
	
	
	// 零件尺寸信息
	sizeMap    ["component-1-view-1"] = new size(289, 116);
	sizeMap    ["component-1-view-4"] = new size(289, 116);
	
	sizeMap	   ["component-2-view-1"] = new size(315, 87);
	sizeMap	   ["component-2-view-2"] = new size(88, 38);
	sizeMap	   ["component-2-view-3"] = new size(88, 38);
	sizeMap	   ["component-2-view-4"] = new size(315, 87);
	
	sizeMap	   ["component-3-view-1"] = new size(402, 118);
	sizeMap	   ["component-3-view-2"] = new size(389, 89);
	sizeMap	   ["component-3-view-3"] = new size(386, 89);
	sizeMap	   ["component-3-view-4"] = new size(402, 118);
	
	sizeMap	   ["component-4-view-1"] = new size(114, 150);
	sizeMap	   ["component-4-view-2"] = new size(92, 137); 
	
	sizeMap	   ["component-5-view-1"] = new size(127, 120);
	sizeMap	   ["component-5-view-2"] = new size(59, 109); 
	
	sizeMap	   ["component-6-view-1"] = new size(81, 131);
	sizeMap	   ["component-6-view-2"] = new size(120, 147); 
	
	sizeMap	   ["component-7-view-1"] = new size(67, 127);
	sizeMap	   ["component-7-view-2"] = new size(182, 170);
	
	sizeMap	   ["component-8-view-1"] = new size(67, 36);
	sizeMap	   ["component-8-view-2"] = new size(47, 30); 
	
	sizeMap	   ["component-9-view-1"] = new size(161, 76);
	sizeMap	   ["component-9-view-2"] = new size(144, 90); 
	
	sizeMap	   ["component-10-view-1"] = new size(20, 55);
	sizeMap	   ["component-10-view-2"] = new size(345, 125);
	sizeMap	   ["component-10-view-3"] = new size(345, 125);
	sizeMap	   ["component-10-view-4"] = new size(20, 55);
	 
	sizeMap	   ["component-11-view-2"] = new size(257, 118);
	sizeMap	   ["component-11-view-3"] = new size(257, 118); 
	 
	sizeMap	   ["component-12-view-3"] = new size(120, 147);
	sizeMap	   ["component-12-view-4"] = new size(81, 131);
	 
	sizeMap	   ["component-13-view-3"] = new size(47, 30);
	sizeMap	   ["component-13-view-4"] = new size(67,36);
	 
	sizeMap	   ["component-14-view-3"] = new size(182, 170);
	sizeMap	   ["component-14-view-4"] = new size(67, 127);
	 
	sizeMap	   ["component-15-view-3"] = new size(92, 137);
	sizeMap	   ["component-15-view-4"] = new size(114, 150);
	 
	sizeMap	   ["component-16-view-3"] = new size(59, 109);
	sizeMap	   ["component-16-view-4"] = new size(127, 120);
	 
	sizeMap	   ["component-17-view-3"] = new size(144, 90);
	sizeMap	   ["component-17-view-4"] = new size(161, 76);
	
	sizeMap	   ["component-18-view-1"] = new size(578, 276);
	sizeMap	   ["component-18-view-2"] = new size(581, 310);
	sizeMap	   ["component-18-view-3"] = new size(581, 310);
	sizeMap	   ["component-18-view-4"] = new size(578, 276);
}
