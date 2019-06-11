function get_line(str,element,keys,values){
    //alert('????');
    
    var myChart = echarts.init(element);
    var option = {
    //renderAsImage:  true,
     title:
        {
            text: str,
            //subtext: '数据来源于时事探针',
            textStyle:
                {
                    fontSize: 18,
                    fontFamily: "'Microsoft YaHei',Arial"
                }
        },
    tooltip: {
        trigger: 'axis',
        textStyle:
                {
                    fontSize: 12,
                    fontFamily: "'Microsoft YaHei',Arial"
                }
    },
    legend: {
        data: ['全部', '负面', '正面', '中性'],
        orient: "horizontal",
        x: "right",
        y: "top",
        textStyle:
                {
                    fontSize: 12,
                    fontFamily: "'Microsoft YaHei',Arial"
                },
        selected: {
            'All': false,
            "全部":false
        },
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        x: 'left',
        y: 'center',
        itemSize: 16,
        itemGap: 10,
        padding: 5,
        feature: {
            //mark: { show: true },
            dataView: { show: true, readOnly: false },
            dataZoom: { show: true },
            //magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: null,
            //label: "#reports"
            axisLabel:
               {
                   textStyle:
                   {
                       fontSize: 12,
                       fontFamily: "'Microsoft YaHei',Arial"
                   },

               }
        }
    ],
    dataZoom: {
        show: true,
        realtime: true,
        start: 0,
        end: 100,
        //backgroundColor: 'rgba(221,160,221,0.5)',
        dataBackgroundColor: 'rgba(138,43,226,0.5)',
        //fillerColor: 'rgba(38,143,26,0.6)',
        //handleColor: 'rgba(128,43,16,0.8)',
    },
    yAxis: [
        {
            type: 'value',
            axisLabel:
               {
                   textStyle:
                   {
                       fontSize: 12,
                       fontFamily: "'Microsoft YaHei',Arial"
                   },

               }
        }
    ],
    grid:
    {
        x1: 20,
        x2: 20        
    },
    series: [
        {
            name: '全部',
            type: 'line',
            stack: 'Total',
            symbol: 'none',
            itemStyle: {
                normal: {
                    //areaStyle: { type: 'default', color: '#3399ff' },
                    color: '#ff7f50',
                    lineStyle: {
                        width: 2,
                        type: 'solid'
                    }
                }
            },
            data: null
        },
        {
            name: '负面',
            type: 'line',
            stack: 'Opinion',
            symbol: 'none',
            itemStyle: {
                normal: {
                    areaStyle: { type: 'default', color: '#FF0033' },
                    color: '#FF0033',
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            data: null
        },
        {
            name: '正面',
            type: 'line',
            stack: 'Opinion',
            symbol: 'none',
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default',
                        color: '#33a02c'// '#3399ff'
                    },
                    color:'#33a02c',// '#3399ff',
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            data: null
        },
        {
            name: '中性',
            type: 'line',
            stack: 'Opinion',
            symbol: 'none',
            itemStyle: {
                normal: {
                    areaStyle: { type: 'default', color: '#CCCC00' },
                    color: '#CCCC00',
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            data: null
        }

    ]
};

    //myChart.on("dataZoom", dataZoomed);
    option.animation = false;
    option.xAxis[0].data = keys;    
    option.series[1].data = values[0]; //neg
    option.series[3].data = values[1]; //neu
    option.series[2].data = values[2];//pos


    var total = 0, pos = 0, neg = 0, neu=0, prob = 0;
    for (var i = 0; i < values[0].length; i++) {
        neg += values[0][i];
    }
    $("#numNeg").html(neg);

    for (var i = 0; i < values[1].length; i++) {
        neu += values[1][i];
    }
    $("#numNeu").html(neu);

    for (var i = 0; i < values[2].length; i++) {
        pos += values[2][i];
    }
    $("#numPos").html(pos);

    for (var i = 0; i < values[3].length; i++) {
        total += values[3][i];
    }
    $("#numTotal").html(total);

    //var wilson = GetVoteRange(pos, neg, neu);

    //var prob = wilson.vsProb.toFixed(3)
    //$("#probOpinion").html(prob);

    option.series[0].data = values[3];
    //console.log(values[3]);
    // 为echarts对象加载数据 
    myChart.setOption(option, true);
    
}

function get_rel(str,element,data){
    //alert('????');
    
    var myChart = echarts.init(element);
    var myGraphData = [
        { "parentNode":"张三", "childNodes":["小明", "小华", "小杰", "小婷","小妍","小飞"]},
        { "parentNode":"张三", "childNodes":[]},
        { "parentNode":"小明", "childNodes":[ ] },
        { "parentNode":"小华", "childNodes":[  ] },
        { "parentNode":"小杰", "childNodes":[  ] },
        { "parentNode":"小婷", "childNodes":[  ] },
        { "parentNode":"小妍", "childNodes":[  ] },
        { "parentNode":"小飞", "childNodes":[  ] }
        /*{ "parentNode":"张三", "childNodes":["小明", "小华", "小杰", "小婷","小妍","小飞"]},
        { "parentNode":"小明", "childNodes":[ "小王", "小赵", "小钱" ] },
        { "parentNode":"小华", "childNodes":[ "小孙", "小李", "小周" ] },
        { "parentNode":"小杰", "childNodes":[ "小吴", "小郑" ] },
        { "parentNode":"小婷", "childNodes":[ "小谢", "小潘" ] },
        { "parentNode":"小妍", "childNodes":[ "小苏", "小陈" ] },
        { "parentNode":"小飞", "childNodes":[ "小郭", "小彭" ] }*/
        
    ];
        
function setNodeData(arr, m, n ,listdata) {
    var size = 33;
    for(var i=0; i<arr.length; i++){
        listdata.push({
            id : m++,
            category: n,
            name: arr[i],
            symbolSize: size,
            draggable: "true"
        });
    }
}
        
function setLinkData(sourceList, m, links) {
    for(var i=0; i<sourceList.length; i++){
        links.push({
            "source": sourceList[i],
            "target": m,
            lineStyle: {
                normal: {
                    color: 'source',
                }
            }
        })
    }
}    

var listdata = [];
var linksdata = [];     

var nodeData = myGraphData;
var m = 0;
var source = [];
for(var i=1; i < nodeData.length; i++){
    var node = nodeData[i].parentNode;
    var tx = [node];
    setNodeData( tx, m, 1, listdata);
    source.push(m);

    var Data = nodeData[i].childNodes;
    setNodeData( Data, m+1, 2, listdata);

    var sourceList = [];
    for(var n = m+1; n < m + Data.length + 1; n++){
        sourceList.push(n);
    }
    setLinkData( sourceList, m, linksdata);
    m = m + Data.length + 1;
}
        
var tx7 = [];
tx7.push(nodeData[0].parentNode);
setNodeData(tx7, m, 0, listdata);
setLinkData(source, m, linksdata);

option = {
    title: {
        text: "张三的朋友和他朋友的朋友",
        top: "top",
        left: "left",
        textStyle: {
            color: '#292421'
        }
    },
    tooltip: {
        formatter: '{b}'
    },
    backgroundColor: '#FFFFFF',
    legend: {
        show : true,
        data : [ {
            name : '父节点',             
            icon : 'rect'
        },
        {
            name : '层级二',             
            icon : 'roundRect'
        }, {
            name : '层级三',              
            icon : 'circle'
        } ],
        textStyle: {
            color: '#292421'
        },
        icon: 'circle',
        type: 'scroll',
        orient: 'horizontal',
        left: 10,
        top: 20,
        bottom: 20,
        itemWidth: 10,
        itemHeight: 10
    },
    animationDuration: 0,
    animationEasingUpdate: 'quinticInOut',
    series: [{
        name: '知识图谱',
        type: 'graph',
        layout: 'force',
        force: {
            repulsion: 300,
            gravity: 0.1,
            edgeLength: 15,
            layoutAnimation: true,
        },
        data: listdata,
        links: linksdata,
        categories:[ 
            {
                name : '父节点',
                symbol : 'rect',
                label : {
                }
            }, {
                name : '层级二',
                symbol : 'rect'
            }, {
                name : '层级三',
                symbol : 'roundRect'
            }],
        roam: true,
        label: {
            normal: {
                show: true,
                position: 'bottom',
                formatter: '{b}',
                fontSize: 10,
                fontStyle: '600',
            }
        },
        lineStyle: {
            normal: {
                opacity: 0.9,
                width: 1.5,
                curveness: 0
            }
        }
    }]
};
myChart.setOption(option, true);
    
}






function get_chinamap2(str,element,element2,dataProv, dataCity){
    //alert('????');
    
    var myChart = echarts.init(element);
    var option = {
        tooltip: {
            trigger: 'item'
        },
        toolbox: {
            show: true,
            orient: 'vertical',
          //  x: 'right',
           // y: 'center',
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false }
            }
        },
        series: [
            {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                name: 'Province',
                type: 'map',
                mapType: 'china',
                roam: false,
                mapLocation: {
                  //  x: 'left',
                  //  y: 'top',
                   // width: '51%'
                  // x:-1
                },

                selectedMode: 'single',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle:
                               {
                                   fontFamily: "'Microsoft YaHei',Arial"
                               }
                        },
                       
                    },
                    emphasis: {
                        label: { show: true },
                        borderColor: 'red',
                    }
                },
                data: []
            },

        ],
        animation: false,
        dataRange: {
            x: "left",
            //orient:"horizontal",
            //
            //y: "70%",
            min: 0,
            max: 100,
            value: 100,
            calculable: true,
            color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
            textStyle: {
                color: '#fff'
            }
        },
    };

    var maxRange = 1000;

    if (dataProv.length > 0) {
        var prov = dataProv[dataProv.length - 1];
        prov.selected = true;
        //option.series[1].mapType = prov.name;
        get_promap(str,element2,prov.name,dataCity)
        maxRange = prov.value;
        if (maxRange > 10) {
            maxRange = maxRange *0.8;
        }

        var idx = dataProv.length * 0.9;
        for (var j = 0; j < dataProv.length; j++) {
            if (j > idx) {
                maxRange = dataProv[j].value;
                break;
            }
        }

        option.dataRange.max = maxRange;
        option.dataRange.value = maxRange;

    }

    option.series[0].data = dataProv;
    //option.series[1].data = dataCity;
    myChart.setOption(option, true);

    myChart.on("click", function (param) {
        //var selected = param.selected;
        var selectedProvince = param.name;
        //var name;
        //for (var i = 0, l = _mapOption.series[0].data.length; i < l; i++) {
        //    name = _mapOption.series[0].data[i].name;
        //    _mapOption.series[0].data[i].selected = selected[name];
        //    if (selected[name]) {
        //        selectedProvince = name;
        //    }
        //}
       // option.series[1].mapType = selectedProvince;
        //myChart.setOption(option, true);
        get_promap(str,element2,selectedProvince,{})
    });
    //myChart.setOption(option);
}

function get_chinamap(str,element,dataProv){
    
    var myChart = echarts.init(element);
    var option = {
        title:
        {
            text: str,
            textStyle:
                {
                    fontSize: 18,
                    fontFamily: "'Microsoft YaHei',Arial"
                }
        },
        tooltip: {
            trigger: 'item'
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false }
            }
        },
        series: [
            {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                name: 'Province',
                type: 'map',
                mapType: 'china',
                roam: false,
                mapLocation: {
                },

                selectedMode: 'single',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle:
                               {
                                   fontFamily: "'Microsoft YaHei',Arial"
                               }
                        },
                       
                    },
                    emphasis: {
                        label: { show: true },
                        borderColor: 'red',
                    }
                },
                data: []
            },

        ],
        animation: false,
        dataRange: {
            x: "left",
            min: 0,
            max: 100,
            value: 100,
            calculable: true,
            color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
            textStyle: {
                color: '#fff'
            }
        },
    };

    var maxRange = 1000;
    if (dataProv.length > 0) {
        maxRange = 0;
        // var prov = dataProv[dataProv.length - 1];
        // prov.selected = true;
        // get_promap(str,element2,prov.name,dataCity)
        // maxRange = prov.value;
        // if (maxRange > 10) {
        //     maxRange = maxRange *0.8;
        // }

        var idx = dataProv.length;
        for (var j = 0; j < dataProv.length; j++) {
            if (dataProv[j].value>maxRange){
                maxRange=dataProv[j].value;
            }
            
        }

        option.dataRange.max = maxRange;
        option.dataRange.value = maxRange;
        //alert(maxRange);

    }

    option.series[0].data = dataProv;
    myChart.setOption(option, true);

    // myChart.on("click", function (param) {
    //     var selectedProvince = param.name;
    //     get_promap(str,element2,selectedProvince,{})
    // });
}






function get_promap(str,element,selectedProvince,dataCity){
    //alert('????');
    
    var myChart = echarts.init(element);
    var option = {
        tooltip: {
            trigger: 'item'
        },
        toolbox: {
            show: true,
            orient: 'vertical',
          //  x: 'right',
           // y: 'center',
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false }
            }
        },
        series: [

            //city level
            {
                type: 'map',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle:
                               {
                                   fontFamily: "'Microsoft YaHei',Arial"
                               }
                        }
                    },
                    emphasis: { label: { show: true } }
                },
                roam: false,
                mapLocation: {
                    x:'right'
                  // x: 'right',
                   // y: 'top',
                   // width: '49%'
        
                },

                data: []
            }
        ],
        animation: false,
        dataRange: {
            x: "left",
            //orient:"horizontal",
            //
            //y: "70%",
            min: 0,
            max: 100,
            value: 100,
            calculable: true,
            color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
            textStyle: {
                color: '#fff'
            }
        },
    };

    var maxRange = 1000;

    
    option.series[0].mapType = selectedProvince
    option.series[0].data = dataCity;
    myChart.setOption(option, true);

   
}


function get_worldmap(str,element,dataCountry){
    
    var myChart = echarts.init(element);
    var option = {
        tooltip: {
        trigger: 'item',
        formatter: '{b}'
        },
    series: [
        {
            name: '世界地图',
            type: 'map',
            mapType: 'world',
            roam: false,
            selectedMode: 'single',
            itemStyle: {
                normal: { label: { show: false } },
                emphasis: { label: { show: true } }
            },
            data: [],
            // 自定义名称
            nameMap: {
                'Afghanistan': '阿富汗',
                'Angola': '安哥拉',
                'Albania': '阿尔巴尼亚',
                'United Arab Emirates': '阿联酋',
                'Argentina': '阿根廷',
                'Armenia': '亚美尼亚',
                'French Southern and Antarctic Lands': '法属南半球和南极领地',
                'Australia': '澳大利亚',
                'Austria': '奥地利',
                'Azerbaijan': '阿塞拜疆',
                'Burundi': '布隆迪',
                'Belgium': '比利时',
                'Benin': '贝宁',
                'Burkina Faso': '布基纳法索',
                'Bangladesh': '孟加拉国',
                'Bulgaria': '保加利亚',
                'The Bahamas': '巴哈马',
                'Bosnia and Herzegovina': '波斯尼亚和黑塞哥维那',
                'Belarus': '白俄罗斯',
                'Belize': '伯利兹',
                'Bermuda': '百慕大',
                'Bolivia': '玻利维亚',
                'Brazil': '巴西',
                'Brunei': '文莱',
                'Bhutan': '不丹',
                'Botswana': '博茨瓦纳',
                'Central African Republic': '中非共和国',
                'Canada': '加拿大',
                'Switzerland': '瑞士',
                'Chile': '智利',
                'China': '中国',
                'Ivory Coast': '象牙海岸',
                'Cameroon': '喀麦隆',
                'Democratic Republic of the Congo': '刚果民主共和国',
                'Republic of the Congo': '刚果共和国',
                'Colombia': '哥伦比亚',
                'Costa Rica': '哥斯达黎加',
                'Cuba': '古巴',
                'Northern Cyprus': '北塞浦路斯',
                'Cyprus': '塞浦路斯',
                'Czech Republic': '捷克共和国',
                'Germany': '德国',
                'Djibouti': '吉布提',
                'Denmark': '丹麦',
                'Dominican Republic': '多明尼加共和国',
                'Algeria': '阿尔及利亚',
                'Ecuador': '厄瓜多尔',
                'Egypt': '埃及',
                'Eritrea': '厄立特里亚',
                'Spain': '西班牙',
                'Estonia': '爱沙尼亚',
                'Ethiopia': '埃塞俄比亚',
                'Finland': '芬兰',
                'Fiji': '斐',
                'Falkland Islands': '福克兰群岛',
                'France': '法国',
                'Gabon': '加蓬',
                'United Kingdom': '英国',
                'Georgia': '格鲁吉亚',
                'Ghana': '加纳',
                'Guinea': '几内亚',
                'Gambia': '冈比亚',
                'Guinea Bissau': '几内亚比绍',
                'Equatorial Guinea': '赤道几内亚',
                'Greece': '希腊',
                'Greenland': '格陵兰',
                'Guatemala': '危地马拉',
                'French Guiana': '法属圭亚那',
                'Guyana': '圭亚那',
                'Honduras': '洪都拉斯',
                'Croatia': '克罗地亚',
                'Haiti': '海地',
                'Hungary': '匈牙利',
                'Indonesia': '印尼',
                'India': '印度',
                'Ireland': '爱尔兰',
                'Iran': '伊朗',
                'Iraq': '伊拉克',
                'Iceland': '冰岛',
                'Israel': '以色列',
                'Italy': '意大利',
                'Jamaica': '牙买加',
                'Jordan': '约旦',
                'Japan': '日本',
                'Kazakhstan': '哈萨克斯坦',
                'Kenya': '肯尼亚',
                'Kyrgyzstan': '吉尔吉斯斯坦',
                'Cambodia': '柬埔寨',
                'South Korea': '韩国',
                'Kosovo': '科索沃',
                'Kuwait': '科威特',
                'Laos': '老挝',
                'Lebanon': '黎巴嫩',
                'Liberia': '利比里亚',
                'Libya': '利比亚',
                'Sri Lanka': '斯里兰卡',
                'Lesotho': '莱索托',
                'Lithuania': '立陶宛',
                'Luxembourg': '卢森堡',
                'Latvia': '拉脱维亚',
                'Morocco': '摩洛哥',
                'Moldova': '摩尔多瓦',
                'Madagascar': '马达加斯加',
                'Mexico': '墨西哥',
                'Macedonia': '马其顿',
                'Mali': '马里',
                'Myanmar': '缅甸',
                'Montenegro': '黑山',
                'Mongolia': '蒙古',
                'Mozambique': '莫桑比克',
                'Mauritania': '毛里塔尼亚',
                'Malawi': '马拉维',
                'Malaysia': '马来西亚',
                'Namibia': '纳米比亚',
                'New Caledonia': '新喀里多尼亚',
                'Niger': '尼日尔',
                'Nigeria': '尼日利亚',
                'Nicaragua': '尼加拉瓜',
                'Netherlands': '荷兰',
                'Norway': '挪威',
                'Nepal': '尼泊尔',
                'New Zealand': '新西兰',
                'Oman': '阿曼',
                'Pakistan': '巴基斯坦',
                'Panama': '巴拿马',
                'Peru': '秘鲁',
                'Philippines': '菲律宾',
                'Papua New Guinea': '巴布亚新几内亚',
                'Poland': '波兰',
                'Puerto Rico': '波多黎各',
                'North Korea': '北朝鲜',
                'Portugal': '葡萄牙',
                'Paraguay': '巴拉圭',
                'Qatar': '卡塔尔',
                'Romania': '罗马尼亚',
                'Russia': '俄罗斯',
                'Rwanda': '卢旺达',
                'Western Sahara': '西撒哈拉',
                'Saudi Arabia': '沙特阿拉伯',
                'Sudan': '苏丹',
                'South Sudan': '南苏丹',
                'Senegal': '塞内加尔',
                'Solomon Islands': '所罗门群岛',
                'Sierra Leone': '塞拉利昂',
                'El Salvador': '萨尔瓦多',
                'Somaliland': '索马里兰',
                'Somalia': '索马里',
                'Republic of Serbia': '塞尔维亚共和国',
                'Suriname': '苏里南',
                'Slovakia': '斯洛伐克',
                'Slovenia': '斯洛文尼亚',
                'Sweden': '瑞典',
                'Swaziland': '斯威士兰',
                'Syria': '叙利亚',
                'Chad': '乍得',
                'Togo': '多哥',
                'Thailand': '泰国',
                'Tajikistan': '塔吉克斯坦',
                'Turkmenistan': '土库曼斯坦',
                'East Timor': '东帝汶',
                'Trinidad and Tobago': '特里尼达和多巴哥',
                'Tunisia': '突尼斯',
                'Turkey': '土耳其',
                'United Republic of Tanzania': '坦桑尼亚联合共和国',
                'Uganda': '乌干达',
                'Ukraine': '乌克兰',
                'Uruguay': '乌拉圭',
                'United States': '美国',
                'Uzbekistan': '乌兹别克斯坦',
                'Venezuela': '委内瑞拉',
                'Vietnam': '越南',
                'Vanuatu': '瓦努阿图',
                'West Bank': '西岸',
                'Yemen': '也门',
                'South Africa': '南非',
                'Zambia': '赞比亚',
                'Zimbabwe': '津巴布韦'
            }
        }
    ],
    dataRange: {
        x: "left",
        //orient:"horizontal",
        //
        //y: "70%",
        min: 0,
        max: 100,
        value: 100,
        calculable: true,
        color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
        textStyle: {
            color: '#fff'
        }
    },
};
    //myChart.setOption(option);
    var maxRange = 1000;

    if (dataCountry.length > 0) {
        var prov = dataCountry[dataCountry.length - 1];
        prov.selected = true;        
        maxRange = prov.value;
        if (maxRange > 10) {
            maxRange = maxRange * 0.8;
        }
        var idx = dataCountry.length * 0.9;
        for (var j = 0; j < dataCountry.length; j++) {
            if (j > idx) {
                maxRange = dataCountry[j].value;
                break;
            }
        }
        option.dataRange.max = maxRange;
        option.dataRange.value = maxRange;
    }
    option.series[0].data = dataCountry;    
    myChart.setOption(option, true);

    myChart.on("click", function (param) {
        //var selected = param.selected;
        //var selectedProvince = param.name;        
        //_mapOption.series[1].mapType = selectedProvince;
        //_mapChart.setOption(_mapOption, true);
    });

}

function get_wordcloud(str,element, dataWordCloud) {
    var myChart = echarts.init(element);
    var option ={
        title: {
            text: '热门话题及实体',
            link: 'http://www.playbigdata.com'
        },
        tooltip: {
            show: true
        },
        series: [{
            name: '',
            type: 'wordCloud',
            size: ['99%', '99%'],
            textRotation: [0, 45, 90, -45],
            textPadding: 0,
            autoSize: {
                enable: true,
                minSize: 14
            },
            data: [
            ]
        }]
    };
    /*
    var items = [];
    for (var i = dataWordCloud.length - 1; i >= 0; i--) {
        alert(dataWordCloud[i])
        items.push(dataWordCloud[i]);
    }*/
    option.series[0].data = dataWordCloud;
    myChart.setOption(option, true);
    
}

function get_column(str,element,datakey,datavalue){
    //alert('????');
    //var _colorListLight = ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3",
     //   "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd"];
    var _colorList = ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072"];
    var myChart = echarts.init(element);
    var option = {
        tooltip: {
        show: true,
        trigger: 'item',
        enterable:true,
        textStyle:
                {
                    fontSize: 12
                },
        position: function (p) {
            return [0, p[1] + 30];
        },
        padding: 10,
        //showDelay: 1000,
        formatter: function (params, ticket, callback) {


            var res = params.name + ' : ' + params.value; //params.seriesName + ''
            
            /*if (_uiType == "big") {
                res = "<a href=\"big.aspx?q=" + encodeURIComponent("\"" + params.name + "\"") + "\">" + params.name + "</a> : " + params.value;
            } else {
                res = "<a href=\""+_SearchPage+"?q=" + encodeURIComponent("\"" + params.name + "\"") + "\">" + params.name + "</a> : " + params.value;
            }
            var selectedItem = params.name;*/
            /*if (params.seriesName == "Opinion") {
                for (var key in _opininStr) {
                    if (_opininStr[key] === selectedItem) {
                        selectedItem = key;
                        break;
                    }
                }
            }

            else if (params.seriesName === "DataM_ChinaRegion1"
                   || params.seriesName === "DataM_ChinaRegion2"
                   || params.seriesName === "DataM_ChinaRegion3"
                || params.seriesName === "PntData_ChinaRegion1"
                   || params.seriesName === "PntData_ChinaRegion2"
                   || params.seriesName === "PntData_ChinaRegion3"
                //|| params.seriesName === "DataS_question.loc_province"
                //|| params.seriesName === "DataS_question.loc_city"

                ) {

                selectedItem = _regionMapping[selectedItem];
            }*/

            //GetPreviewData(params.seriesName, selectedItem, callback, ticket, res);
            return res;
        }
    },
    title:
        {
            text: "default name",
            textStyle:
                {
                    fontSize: 18
                }
        },
    legend: {
        data: ['Count'],
        padding: 0,
        show: false,
        textStyle:
                {
                    fontSize: 12,
                    fontFamily: "'Microsoft YaHei',Arial"
                }

    },

     xAxis: [
        {
            type: 'value',
            boundaryGap: [0, 0.01],
            xisTick: { onGap: false },
            axisLabel:
               {
                   textStyle:
                   {
                       fontSize: 12,
                       fontFamily: "'Microsoft YaHei',Arial"
                   },

               }
        }
    ],
    yAxis: [
        {
            show:false,
            type: 'category',
            data: null,
            position: "left",
            axisTick:
                {
                    inside:true
                },
            axisLabel:
                {
                    clickable: true,
                    textStyle:
                    {
                        fontSize: 12,
                        fontFamily: "'Microsoft YaHei',Arial"
                    },
                }
        }
    ],
     grid:
        {
            //borderWidth:1,
            x: 10,
            y: 40,
            x2: 10,
            y2: 40
        },
        toolbox: {
            show: true,
            feature: {
                mark: {
                    show: true
                },
                dataView: {
                    show: true,
                    readOnly: true
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                },
                magicType : {show: true, type: ['line', 'bar','pie', 'funnel']},

            }
        },
    
    series: [
        {
            name: "sname",
            type: "bar",
            barMinHeight:10,
            data: null,

            itemStyle: {
                emphasis:
                    {
                        barBorderColor: '#DDDDDD',
                        barBorderWidth: 1,
                        label:
                            {
                                show:true,
                                textStyle:
                                    {
                                        color: 'black',
                                        fontFamily: "'Microsoft YaHei',Arial"
                                    }
                            }
                    },
                normal: {
                    color: function (params) {
                        return _colorList[_colorList.length - params.dataIndex % _colorList.length - 1];
                    },
                    barBorderColor: '#666666',
                    barBorderWidth: 0,
                    label: {
                        show: true,
                        //clickable:true,
                        position: 'insideLeft',
                        textStyle: {
                            color: 'black',                          
                            //fontSize: 10,
                            fontFamily: "'Microsoft YaHei',Arial"
                        },
                         formatter: '{b}'                         
                    }
                }
            }
        }
    ],
};

option.title.text = str;
//option.yAxis[0].data = ['快乐男声','花儿与少年','明日之子','天籁之声'];
//option.series[0].name = '华晨宇';
 //   option.series[0].data = [11,15,16,20];
option.yAxis[0].data = datakey;
//option.series[0].name = '华晨宇';
    option.series[0].data = datavalue;
    myChart.setOption(option);
    
}














