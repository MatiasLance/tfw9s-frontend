<template>
  <div>
    <div
      id="sky"
      class="fixed top-0 z-50 flex
      h-screen w-screen
      items-center justify-center"
    >
      <div
        class="hidden
        h-screen w-screen
        flex-col items-center justify-center
        bg-gradient-to-r from-slate-800 to-brand-black text-white md:flex"
      >
        <div id="stars" class="z-30 self-start"></div>
        <div id="stars2" class="z-40 self-start"></div>
        <div id="stars3" class="z-20 self-start"></div>

        <div class="my-5 pb-4">
          <span
          class="superheadline text-xl font-medium
          text-white"
  >
              We can't find the page you're looking for.
          </span>
        </div>
        <h2
        v-if="error.statusCode === 404"
        class="z-50 block space-y-5 text-8xl font-bold text-white"
        >
          <span class="font-montserrat">Error {{ error.statusCode }}.</span>
        </h2>
        <h2
        v-else
        class="font-montserrat z-50 block space-y-5 text-6xl
        font-bold text-white"
        >
         <span class="font-montserrat">
          An error occured. {{ error.statusCode }}.
          </span>
        </h2>
        <div class="mt-[2em] text-2xl">
          <NuxtLink
            to="/"
            class="space z-50 flex cursor-pointer
            flex-col items-center justify-center
             rounded-md
            px-8 pt-4 duration-150
            ease-in hover:scale-105 hover:text-white"
          >
            <BaseButton
                class="max-w-full border border-[#1a1d18]
                bg-gradient-to-r from-[#1a1d18]
                to-slate-700 py-[1.25em] px-[1.563em]
                font-bold uppercase text-white"
              >
                Go back to homepage
              </BaseButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '../components/base/BaseButton.vue'
export default {
  components: { BaseButton },
  layout: 'error',
  props: {
    error: {
      type: Object,
      default() {
        return { statusCode: 404 };
      }
    }
  }
}
</script>

<style>
.font-montserrat {
    font-family: "Montserrat", Arial, Helvetica, sans-serif;
}
.space img {
  -webkit-animation: mover 2s ease-in-out infinite alternate;
  animation: mover 2s ease-in-out infinite alternate;
}

@-webkit-keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-30px);
  }
}
@keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-30px);
  }
}

#sky {
  height: 100%;
  width: 100vw;
  background: radial-gradient(ellipse at bottom, #182125 0%, #000000 100%);
  overflow: hidden;
  padding: 10% 0;
}

#stars {
  width: 1px;
  height: 1px;
  left: 0;
  background: transparent;
  box-shadow: 1226px 1621px #fb0, 1021px 1311px #fb0, 589px 396px #fb0,
    106px 950px #fb0, 1628px 685px #fb0, 1982px 1853px #fb0, 683px 1196px #fb0,
    885px 147px #fb0, 140px 572px #fb0, 1414px 202px #fb0, 1287px 375px #fb0,
    812px 233px #fb0, 245px 366px #fb0, 619px 1786px #fb0, 158px 727px #fb0,
    1051px 1759px #fb0, 1232px 1572px #fb0, 304px 515px #fb0,
    1107px 1063px #fb0,
    1409px 293px #fb0, 844px 1928px #fb0, 1297px 766px #fb0, 769px 53px #fb0,
    1796px 1499px #fb0, 1096px 1588px #fb0, 6px 1066px #fb0, 954px 1823px #fb0,
    449px 1318px #fb0, 742px 324px #fb0, 1360px 430px #fb0, 474px 517px #fb0,
    1638px 553px #fb0, 65px 362px #fb0, 1668px 305px #fb0, 618px 1791px #fb0,
    1248px 698px #fb0, 526px 1505px #fb0, 443px 1738px #fb0, 968px 744px #fb0,
    1509px 1343px #fb0, 940px 891px #fb0, 1426px 313px #fb0, 86px 1904px #fb0,
    1852px 914px #fb0, 1774px 1138px #fb0, 1406px 378px #fb0, 82px 384px #fb0,
    1195px 1561px #fb0, 472px 1994px #fb0, 887px 708px #fb0, 1078px 680px #fb0,
    1715px 140px #fb0, 333px 1224px #fb0, 1538px 412px #fb0, 1476px 644px #fb0,
    976px 149px #fb0, 938px 1127px #fb0, 531px 1088px #fb0, 996px 403px #fb0,
    279px 1233px #fb0, 1761px 1297px #fb0, 1126px 1184px #fb0,
    1417px 375px #fb0,
    1085px 1137px #fb0, 669px 987px #fb0, 1149px 1963px #fb0, 1097px 880px #fb0,
    1591px 85px #fb0, 1858px 884px #fb0, 1187px 1483px #fb0, 1246px 415px #fb0,
    126px 516px #fb0, 1824px 672px #fb0, 178px 250px #fb0, 1675px 146px #fb0,
    1827px 816px #fb0, 803px 992px #fb0, 1703px 1664px #fb0, 1658px 970px #fb0,
    1607px 1896px #fb0, 268px 499px #fb0, 465px 395px #fb0, 287px 468px #fb0,
    980px 1675px #fb0, 1959px 1989px #fb0, 429px 1263px #fb0, 1419px
    1703px #fb0,
    302px 335px #fb0, 1470px 698px #fb0, 431px 1784px #fb0, 1397px 1168px #fb0,
    585px 143px #fb0, 1163px 455px #fb0, 1007px 1355px #fb0, 764px 1147px #fb0,
    1528px 1835px #fb0, 1298px 1629px #fb0, 438px 971px #fb0, 1940px
    1307px #fb0,
    1767px 1080px #fb0, 1700px 1582px #fb0, 911px 709px #fb0, 1733px
    1916px #fb0,
    1650px 1153px #fb0, 1491px 1908px #fb0, 1221px 1065px #fb0, 389px
    749px #fb0,
    576px 602px #fb0, 84px 1595px #fb0, 1887px 1748px #fb0, 1293px 1674px #fb0,
    1372px 986px #fb0, 834px 1280px #fb0, 241px 777px #fb0, 1122px 1540px #fb0,
    908px 1032px #fb0, 1715px 14px #fb0, 732px 1014px #fb0, 1888px 766px #fb0,
    1433px 1174px #fb0, 1273px 1889px #fb0, 337px 301px #fb0,
    1449px 1878px #fb0,
    946px 1411px #fb0, 965px 181px #fb0, 1508px 537px #fb0, 977px 1648px #fb0,
    696px 1932px #fb0, 601px 305px #fb0, 1734px 186px #fb0, 1962px 1776px #fb0,
    965px 791px #fb0, 1563px 422px #fb0, 1427px 822px #fb0, 1540px 599px #fb0,
    1246px 1681px #fb0, 1271px 1136px #fb0, 1411px 641px #fb0,
    1108px 1981px #fb0, 961px 1884px #fb0, 788px 631px #fb0, 172px 783px #fb0,
    1729px 455px #fb0, 1682px 1051px #fb0, 911px 1455px #fb0, 1652px 489px #fb0,
    880px 94px #fb0, 59px 747px #fb0, 417px 223px #fb0, 332px 1397px #fb0,
    699px 659px #fb0, 693px 728px #fb0, 1232px 208px #fb0, 1514px 774px #fb0,
    1070px 633px #fb0, 1768px 165px #fb0, 1261px 1666px #fb0, 35px 1979px #fb0,
    54px 1408px #fb0, 820px 745px #fb0, 1732px 147px #fb0, 1282px 1121px #fb0,
    1640px 1px #fb0, 1932px 632px #fb0, 895px 31px #fb0, 1751px 266px #fb0,
    746px 54px #fb0, 1197px 986px #fb0, 1032px 658px #fb0, 234px 1526px #fb0,
    1267px 1176px #fb0, 1280px 357px #fb0, 1333px
    381px #fb0, 1739px 1375px #fb0,
    888px 1325px #fb0, 704px 550px #fb0, 20px 359px #fb0, 987px 1218px #fb0,
    794px 1724px #fb0, 774px 590px #fb0, 1024px 227px #fb0, 1487px 400px #fb0,
    1446px 627px #fb0, 984px 1342px #fb0, 966px 703px #fb0, 105px 1673px #fb0,
    1225px 1267px #fb0, 119px 1202px #fb0, 1458px 273px #fb0,
    1057px 1167px #fb0,
    116px 735px #fb0, 665px 1021px #fb0, 476px 1830px #fb0, 145px 906px #fb0,
    502px 596px #fb0, 1629px 645px #fb0, 728px 1972px #fb0, 342px 605px #fb0,
    1331px 179px #fb0, 707px 1684px #fb0, 388px 1757px #fb0, 805px 73px #fb0,
    659px 180px #fb0, 848px 915px #fb0, 182px 1550px #fb0, 1955px 155px #fb0,
    973px 1546px #fb0, 1061px 1579px #fb0, 52px 687px #fb0, 1104px 1352px #fb0,
    408px 1386px #fb0, 1888px 1692px #fb0, 956px 1018px #fb0,
    1355px 1568px #fb0,
    1505px 1550px #fb0, 1182px 705px #fb0, 959px 1050px #fb0, 498px 1432px #fb0,
    301px 647px #fb0, 443px 334px #fb0, 1402px 461px #fb0, 147px 1270px #fb0,
    391px 1572px #fb0, 1017px 341px #fb0, 68px 1770px #fb0, 235px 860px #fb0,
    505px 816px #fb0, 1312px 986px #fb0, 1079px 1293px #fb0, 324px 611px #fb0,
    1179px 1011px #fb0, 277px 434px #fb0, 1767px 252px #fb0, 1775px 1487px #fb0,
    1705px 19px #fb0, 326px 721px #fb0, 378px 70px #fb0, 895px 1736px #fb0,
    1570px 365px #fb0, 513px 615px #fb0, 1092px 147px #fb0, 1318px 1932px #fb0,
    1592px 1734px #fb0, 699px 918px #fb0, 111px 388px #fb0, 1067px 890px #fb0,
    1169px 332px #fb0, 358px 481px #fb0, 1630px 750px #fb0, 179px 1787px #fb0,
    355px 489px #fb0, 852px 821px #fb0, 868px 364px #fb0, 386px 1700px #fb0,
    799px 1420px #fb0, 1472px 644px #fb0, 1552px 905px #fb0, 48px 1998px #fb0,
    1850px 51px #fb0, 416px 678px #fb0, 759px 1046px #fb0, 1451px 1951px #fb0,
    101px 1610px #fb0, 1469px 912px #fb0, 1214px 1292px
    #fb0, 1368px 1018px #fb0,
    484px 470px #fb0, 816px 322px #fb0, 1821px 1326px #fb0, 327px 1936px #fb0,
    752px 550px #fb0, 1215px 1924px #fb0, 180px 122px #fb0, 784px 1924px #fb0,
    1597px 336px #fb0, 248px 1429px #fb0, 4px 181px #fb0, 1801px 1613px #fb0,
    1581px 1719px #fb0, 640px 1391px #fb0, 960px 302px #fb0, 1483px 1207px #fb0,
    520px 1119px #fb0, 25px 1754px #fb0, 545px 317px #fb0, 1573px 751px #fb0,
    1415px 2px #fb0, 101px 761px #fb0, 679px 291px #fb0, 1785px 676px #fb0,
    1256px 136px #fb0, 855px 197px #fb0, 1399px 1973px #fb0, 1243px 429px #fb0,
    1281px 571px #fb0, 839px 531px #fb0, 789px 1980px #fb0, 877px 783px #fb0,
    1526px 1850px #fb0, 644px 1283px #fb0, 1982px 1953px #fb0,
    1109px 1232px #fb0, 1532px 643px #fb0, 823px 1287px #fb0, 667px 34px #fb0,
    24px 1469px #fb0, 1029px 1130px #fb0, 1645px 254px #fb0, 1054px 1000px #fb0,
    1341px 254px #fb0, 184px 188px #fb0, 1160px 1521px #fb0, 348px 1083px #fb0,
    1436px 1796px #fb0, 441px 361px #fb0, 1239px 575px #fb0, 1055px 140px #fb0,
    1552px 502px #fb0, 607px 864px #fb0, 967px 1883px #fb0, 1407px 1955px #fb0,
    405px 1148px #fb0, 604px 992px #fb0, 1116px 506px #fb0, 13px 832px #fb0,
    295px 189px #fb0, 964px 1175px #fb0, 1988px 52px #fb0, 935px 209px #fb0,
    17px 142px #fb0, 770px 333px #fb0, 682px 633px #fb0, 510px 466px #fb0,
    366px 79px #fb0, 199px 954px #fb0, 882px 277px #fb0, 744px 655px #fb0,
    37px 1659px #fb0, 1217px 1885px #fb0, 1107px 597px #fb0, 1060px 1335px #fb0,
    773px 601px #fb0, 1939px 1632px #fb0, 1607px 1774px #fb0,
    1531px 1550px #fb0,
    1042px 60px #fb0, 850px 1502px #fb0, 1670px 492px #fb0, 1357px 1654px #fb0,
    1279px 1521px #fb0, 633px 1956px #fb0, 1122px 1981px #fb0, 661px 657px #fb0,
    521px 1132px #fb0, 1593px 813px #fb0, 1204px 1463px
    #fb0, 1112px 1495px #fb0,
    1755px 367px #fb0, 1685px 1805px #fb0, 1982px 196px #fb0, 484px 51px #fb0,
    1041px 330px #fb0, 1487px 563px #fb0, 311px 1872px #fb0, 330px 976px #fb0,
    6px 1754px #fb0, 1447px 1182px #fb0, 1926px 148px #fb0, 1640px 490px #fb0,
    1548px 1357px #fb0, 1052px 1340px #fb0, 1083px 56px #fb0, 1890px 339px #fb0,
    277px 1609px #fb0, 892px 1792px #fb0, 1322px 86px #fb0, 1509px 1515px #fb0,
    1650px 1722px #fb0, 334px 497px #fb0, 888px 143px #fb0, 1325px 259px #fb0,
    1330px 1505px #fb0, 1374px 645px #fb0, 1184px 937px #fb0, 911px 1044px #fb0,
    32px 1257px #fb0, 297px 1884px #fb0, 1031px 963px #fb0, 411px 916px #fb0,
    243px 1305px #fb0, 898px 200px #fb0, 1550px 156px #fb0, 159px 716px #fb0,
    240px 1130px #fb0, 1046px 1905px #fb0, 1405px 1277px #fb0, 275px 124px #fb0,
    964px 795px #fb0, 1270px 1387px #fb0, 1391px 1880px #fb0, 484px 1027px #fb0,
    1681px 1706px #fb0, 1665px 697px #fb0, 1073px 1078px #fb0,
    1808px 1313px #fb0, 1669px 1266px #fb0, 1965px 747px
    #fb0, 1734px 972px #fb0,
    1549px 1434px #fb0, 945px 146px #fb0, 1211px 1383px
    #fb0, 1921px 1637px #fb0,
    271px 1725px #fb0, 739px 1725px #fb0, 1634px 1827px
    #fb0, 961px 1131px #fb0,
    513px 839px #fb0, 1553px 1725px #fb0, 82px 1667px #fb0, 3px 1797px #fb0,
    517px 1511px #fb0, 1644px 929px #fb0, 120px 1638px #fb0, 579px 1168px #fb0,
    147px 680px #fb0, 61px 1146px #fb0, 884px 598px #fb0, 630px 1324px #fb0,
    1709px 1340px #fb0, 1332px 1142px #fb0, 1990px 1397px #fb0,
    854px 1527px #fb0, 1293px 634px #fb0, 1063px 506px #fb0, 1361px 668px #fb0,
    926px 347px #fb0, 145px 1031px #fb0, 1289px 1519px #fb0, 1977px 1560px #fb0,
    70px 1353px #fb0, 653px 1634px #fb0, 1182px 340px #fb0, 1264px 1127px #fb0,
    1246px 40px #fb0, 428px 691px #fb0, 1531px 1817px #fb0, 431px 1906px #fb0,
    1406px 1665px #fb0, 597px 1588px #fb0, 1273px 355px #fb0, 995px 1018px #fb0,
    1319px 528px #fb0, 1454px 715px #fb0, 1587px 1052px #fb0, 921px 193px #fb0,
    1012px 479px #fb0, 689px 1019px #fb0, 1307px 420px #fb0, 1153px 108px #fb0,
    1343px 775px #fb0, 1236px 1061px #fb0, 1117px 1099px #fb0, 308px 533px #fb0,
    1262px 509px #fb0, 830px 24px #fb0, 426px 695px #fb0, 1148px 1397px #fb0,
    1016px 1719px #fb0, 1142px 1280px #fb0, 1841px 310px #fb0,
    1890px 1708px #fb0, 1399px 589px #fb0, 913px 1291px #fb0, 955px 1445px #fb0,
    431px 491px #fb0, 580px 1002px #fb0, 796px 186px #fb0, 445px 1634px #fb0,
    1543px 1377px #fb0, 1853px 57px #fb0, 34px 620px #fb0, 1056px 923px #fb0,
    1027px 134px #fb0, 1248px 1252px #fb0, 756px 1855px #fb0, 143px 654px #fb0,
    253px 347px #fb0, 181px 943px #fb0, 1044px 1774px #fb0, 367px 1925px #fb0,
    1125px 854px #fb0, 1276px 141px #fb0, 422px 413px #fb0, 1261px 973px #fb0,
    1030px 1349px #fb0, 1349px 1850px #fb0, 552px 1286px #fb0, 606px 888px #fb0,
    464px 1922px #fb0, 1799px 260px #fb0, 1984px 788px #fb0, 1210px 450px #fb0,
    1288px 1530px #fb0, 911px 1896px #fb0, 689px 4px #fb0, 806px 162px #fb0,
    1201px 604px #fb0, 908px 531px #fb0, 137px 1123px #fb0, 1165px 496px #fb0,
    1567px 1797px #fb0, 614px 504px #fb0, 1551px
    1165px #fb0, 1309px 1032px #fb0,
    1321px 26px #fb0, 1372px 326px #fb0, 1762px 1159px #fb0, 728px 5px #fb0,
    1364px 459px #fb0, 1333px 918px #fb0, 1082px 1732px #fb0, 286px 319px #fb0,
    1636px 1220px #fb0, 350px 966px #fb0, 124px 219px #fb0, 184px 1654px #fb0,
    1195px 160px #fb0, 1690px 737px #fb0, 1386px 472px #fb0, 1522px 1911px #fb0,
    1082px 1129px #fb0, 491px 67px #fb0, 826px 393px #fb0, 643px 632px #fb0,
    1934px 1461px #fb0, 1325px 316px #fb0, 934px 1722px #fb0, 1044px 879px #fb0,
    1109px 1482px #fb0, 1040px 642px #fb0, 801px 509px #fb0, 1352px 1583px #fb0,
    160px 339px #fb0, 1111px 1731px #fb0, 1650px
    1190px #fb0, 1804px 1019px #fb0,
    745px 604px #fb0, 1391px 1108px #fb0, 344px 708px #fb0, 395px 111px #fb0,
    913px 1180px #fb0, 537px 1036px #fb0, 1048px 1611px #fb0, 1926px 155px #fb0,
    392px 193px #fb0, 1980px 1465px #fb0, 1853px 1349px #fb0, 204px 1317px #fb0,
    1342px 1956px #fb0, 785px 1564px #fb0, 1478px 612px #fb0, 1459px 491px #fb0,
    1767px 265px #fb0, 1032px 495px #fb0, 946px 1196px #fb0, 607px 285px #fb0,
    887px 1940px #fb0, 1618px 962px #fb0, 85px 801px #fb0, 1828px 525px #fb0,
    523px 1927px #fb0, 280px 1676px #fb0, 551px 1133px #fb0, 1888px 936px #fb0,
    875px 863px #fb0, 395px 1954px #fb0, 155px 590px #fb0, 1924px 262px #fb0,
    1039px 1430px #fb0, 1356px 1816px #fb0, 978px
    671px #fb0, 1968px 1044px #fb0,
    1693px 15px #fb0, 266px 1506px #fb0, 1061px 224px #fb0, 690px 1132px #fb0,
    1149px 313px #fb0, 744px 898px #fb0, 848px 1851px #fb0, 296px 761px #fb0,
    55px 624px #fb0, 573px 131px #fb0, 483px 1869px #fb0, 157px 1304px #fb0,
    496px 489px #fb0, 729px 1730px #fb0, 163px 1023px #fb0, 1065px 1426px #fb0,
    1058px 865px #fb0, 1204px 1762px #fb0, 73px 527px #fb0, 668px 1237px #fb0,
    1px 259px #fb0, 1027px 107px #fb0, 1347px 842px #fb0, 720px 819px #fb0,
    97px 1047px #fb0, 474px 1262px #fb0, 1406px 1163px #fb0, 1620px 1312px #fb0,
    292px 423px #fb0, 1579px 1735px #fb0, 687px 305px #fb0, 1810px 1822px #fb0,
    1499px 241px #fb0, 1578px 1308px #fb0, 770px 1441px #fb0, 398px 646px #fb0,
    1186px 1423px #fb0, 6px 201px #fb0, 1684px 1057px #fb0, 1252px 1352px #fb0,
    1649px 317px #fb0, 746px 1777px #fb0, 537px 97px #fb0, 347px 1613px #fb0,
    1709px 1896px #fb0, 134px 957px #fb0, 755px 340px #fb0, 107px 1057px #fb0,
    263px 1459px #fb0, 1559px 1124px #fb0, 1082px 19px #fb0, 557px 795px #fb0,
    596px 455px #fb0, 1877px 1535px #fb0, 457px 320px #fb0, 532px 270px #fb0,
    773px 1991px #fb0, 644px 1840px #fb0, 777px 1413px #fb0, 726px 203px #fb0,
    20px 740px #fb0, 655px 909px #fb0, 396px 1998px #fb0, 235px 954px #fb0,
    1737px 264px #fb0, 670px 1532px #fb0, 498px 159px #fb0, 540px 1997px #fb0,
    1792px 1327px #fb0, 880px 1023px #fb0, 1917px
    1938px #fb0, 1859px 148px #fb0,
    1147px 1781px #fb0, 428px 1876px #fb0, 1952px 605px #fb0, 655px 80px #fb0,
    1500px 1545px #fb0, 1656px 644px #fb0, 615px 247px #fb0, 795px 1881px #fb0,
    1750px 586px #fb0, 148px 1490px #fb0, 1434px 74px #fb0, 417px 1969px #fb0,
    962px 1526px #fb0, 835px 962px #fb0, 330px 1767px #fb0, 1557px 435px #fb0,
    240px 341px #fb0, 1857px 1589px #fb0, 765px 281px #fb0, 1452px 405px #fb0,
    1480px 1724px #fb0, 950px 1094px #fb0, 710px
    1388px #fb0, 1333px 1919px #fb0,
    706px 1589px #fb0, 1476px 1465px #fb0, 744px 291px #fb0, 123px 870px #fb0,
    1406px 428px #fb0, 727px 1609px #fb0, 1149px 1838px #fb0, 78px 169px #fb0,
    1088px 284px #fb0, 670px 399px #fb0, 711px 1923px #fb0, 42px 1720px #fb0,
    667px 570px #fb0, 1274px 693px #fb0, 1056px 644px #fb0, 1937px 793px #fb0,
    1200px 602px #fb0, 1493px 755px #fb0, 545px 870px #fb0, 887px 270px #fb0,
    1290px 164px #fb0, 265px 1185px #fb0;
  animation: animStar 50s linear infinite;
}
#stars:after {
  content: ' ';
  position: absolute;
  top: 2000px;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 1226px 1621px #fb0, 1021px 1311px #fb0, 589px 396px #fb0,
    106px 950px #fb0, 1628px 685px #fb0, 1982px 1853px #fb0, 683px 1196px #fb0,
    885px 147px #fb0, 140px 572px #fb0, 1414px 202px #fb0, 1287px 375px #fb0,
    812px 233px #fb0, 245px 366px #fb0, 619px 1786px #fb0, 158px 727px #fb0,
    1051px 1759px #fb0, 1232px 1572px #fb0, 304px
    515px #fb0, 1107px 1063px #fb0,
    1409px 293px #fb0, 844px 1928px #fb0, 1297px 766px #fb0, 769px 53px #fb0,
    1796px 1499px #fb0, 1096px 1588px #fb0, 6px 1066px #fb0, 954px 1823px #fb0,
    449px 1318px #fb0, 742px 324px #fb0, 1360px 430px #fb0, 474px 517px #fb0,
    1638px 553px #fb0, 65px 362px #fb0, 1668px 305px #fb0, 618px 1791px #fb0,
    1248px 698px #fb0, 526px 1505px #fb0, 443px 1738px #fb0, 968px 744px #fb0,
    1509px 1343px #fb0, 940px 891px #fb0, 1426px 313px #fb0, 86px 1904px #fb0,
    1852px 914px #fb0, 1774px 1138px #fb0, 1406px 378px #fb0, 82px 384px #fb0,
    1195px 1561px #fb0, 472px 1994px #fb0, 887px 708px #fb0, 1078px 680px #fb0,
    1715px 140px #fb0, 333px 1224px #fb0, 1538px 412px #fb0, 1476px 644px #fb0,
    976px 149px #fb0, 938px 1127px #fb0, 531px 1088px #fb0, 996px 403px #fb0,
    279px 1233px #fb0, 1761px 1297px #fb0, 1126px
    1184px #fb0, 1417px 375px #fb0,
    1085px 1137px #fb0, 669px 987px #fb0, 1149px 1963px #fb0, 1097px 880px #fb0,
    1591px 85px #fb0, 1858px 884px #fb0, 1187px 1483px #fb0, 1246px 415px #fb0,
    126px 516px #fb0, 1824px 672px #fb0, 178px 250px #fb0, 1675px 146px #fb0,
    1827px 816px #fb0, 803px 992px #fb0, 1703px 1664px #fb0, 1658px 970px #fb0,
    1607px 1896px #fb0, 268px 499px #fb0, 465px 395px #fb0, 287px 468px #fb0,
    980px 1675px #fb0, 1959px 1989px #fb0, 429px
    1263px #fb0, 1419px 1703px #fb0,
    302px 335px #fb0, 1470px 698px #fb0, 431px 1784px #fb0, 1397px 1168px #fb0,
    585px 143px #fb0, 1163px 455px #fb0, 1007px 1355px #fb0, 764px 1147px #fb0,
    1528px 1835px #fb0, 1298px 1629px #fb0, 438px 971px #fb0,
    1940px 1307px #fb0,
    1767px 1080px #fb0, 1700px 1582px #fb0, 911px 709px #fb0,
    1733px 1916px #fb0,
    1650px 1153px #fb0, 1491px 1908px #fb0, 1221px 1065px #fb0,
    389px 749px #fb0,
    576px 602px #fb0, 84px 1595px #fb0, 1887px 1748px #fb0, 1293px 1674px #fb0,
    1372px 986px #fb0, 834px 1280px #fb0, 241px 777px #fb0, 1122px 1540px #fb0,
    908px 1032px #fb0, 1715px 14px #fb0, 732px 1014px #fb0, 1888px 766px #fb0,
    1433px 1174px #fb0, 1273px 1889px #fb0, 337px 301px #fb0,
    1449px 1878px #fb0,
    946px 1411px #fb0, 965px 181px #fb0, 1508px 537px #fb0, 977px 1648px #fb0,
    696px 1932px #fb0, 601px 305px #fb0, 1734px 186px #fb0, 1962px 1776px #fb0,
    965px 791px #fb0, 1563px 422px #fb0, 1427px 822px #fb0, 1540px 599px #fb0,
    1246px 1681px #fb0, 1271px 1136px #fb0, 1411px 641px #fb0,
    1108px 1981px #fb0, 961px 1884px #fb0, 788px 631px #fb0, 172px 783px #fb0,
    1729px 455px #fb0, 1682px 1051px #fb0, 911px 1455px #fb0, 1652px 489px #fb0,
    880px 94px #fb0, 59px 747px #fb0, 417px 223px #fb0, 332px 1397px #fb0,
    699px 659px #fb0, 693px 728px #fb0, 1232px 208px #fb0, 1514px 774px #fb0,
    1070px 633px #fb0, 1768px 165px #fb0, 1261px 1666px #fb0, 35px 1979px #fb0,
    54px 1408px #fb0, 820px 745px #fb0, 1732px 147px #fb0, 1282px 1121px #fb0,
    1640px 1px #fb0, 1932px 632px #fb0, 895px 31px #fb0, 1751px 266px #fb0,
    746px 54px #fb0, 1197px 986px #fb0, 1032px 658px #fb0,
    234px 1526px #fb0,
    1267px 1176px #fb0, 1280px 357px #fb0, 1333px 381px #fb0,
    1739px 1375px #fb0,
    888px 1325px #fb0, 704px 550px #fb0, 20px 359px #fb0, 987px 1218px #fb0,
    794px 1724px #fb0, 774px 590px #fb0, 1024px 227px #fb0, 1487px 400px #fb0,
    1446px 627px #fb0, 984px 1342px #fb0, 966px 703px #fb0, 105px 1673px #fb0,
    1225px 1267px #fb0, 119px 1202px #fb0, 1458px 273px #fb0,
    1057px 1167px #fb0,
    116px 735px #fb0, 665px 1021px #fb0, 476px 1830px #fb0, 145px 906px #fb0,
    502px 596px #fb0, 1629px 645px #fb0, 728px 1972px #fb0, 342px 605px #fb0,
    1331px 179px #fb0, 707px 1684px #fb0, 388px 1757px #fb0, 805px 73px #fb0,
    659px 180px #fb0, 848px 915px #fb0, 182px 1550px #fb0, 1955px 155px #fb0,
    973px 1546px #fb0, 1061px 1579px #fb0, 52px 687px #fb0, 1104px 1352px #fb0,
    408px 1386px #fb0, 1888px 1692px #fb0, 956px 1018px #fb0,
    1355px 1568px #fb0,
    1505px 1550px #fb0, 1182px 705px #fb0, 959px 1050px #fb0, 498px 1432px #fb0,
    301px 647px #fb0, 443px 334px #fb0, 1402px 461px #fb0, 147px 1270px #fb0,
    391px 1572px #fb0, 1017px 341px #fb0, 68px 1770px #fb0, 235px 860px #fb0,
    505px 816px #fb0, 1312px 986px #fb0, 1079px 1293px #fb0, 324px 611px #fb0,
    1179px 1011px #fb0, 277px 434px #fb0, 1767px 252px #fb0, 1775px 1487px #fb0,
    1705px 19px #fb0, 326px 721px #fb0, 378px 70px #fb0, 895px 1736px #fb0,
    1570px 365px #fb0, 513px 615px #fb0, 1092px 147px #fb0, 1318px 1932px #fb0,
    1592px 1734px #fb0, 699px 918px #fb0, 111px 388px #fb0, 1067px 890px #fb0,
    1169px 332px #fb0, 358px 481px #fb0, 1630px 750px #fb0, 179px 1787px #fb0,
    355px 489px #fb0, 852px 821px #fb0, 868px 364px #fb0, 386px 1700px #fb0,
    799px 1420px #fb0, 1472px 644px #fb0, 1552px 905px #fb0, 48px 1998px #fb0,
    1850px 51px #fb0, 416px 678px #fb0, 759px 1046px #fb0, 1451px 1951px #fb0,
    101px 1610px #fb0, 1469px 912px #fb0, 1214px 1292px #fb0,
    1368px 1018px #fb0,
    484px 470px #fb0, 816px 322px #fb0, 1821px 1326px #fb0, 327px 1936px #fb0,
    752px 550px #fb0, 1215px 1924px #fb0, 180px 122px #fb0, 784px 1924px #fb0,
    1597px 336px #fb0, 248px 1429px #fb0, 4px 181px #fb0, 1801px 1613px #fb0,
    1581px 1719px #fb0, 640px 1391px #fb0, 960px 302px #fb0, 1483px 1207px #fb0,
    520px 1119px #fb0, 25px 1754px #fb0, 545px 317px #fb0, 1573px 751px #fb0,
    1415px 2px #fb0, 101px 761px #fb0, 679px 291px #fb0, 1785px 676px #fb0,
    1256px 136px #fb0, 855px 197px #fb0, 1399px 1973px #fb0, 1243px 429px #fb0,
    1281px 571px #fb0, 839px 531px #fb0, 789px 1980px #fb0, 877px 783px #fb0,
    1526px 1850px #fb0, 644px 1283px #fb0, 1982px 1953px #fb0,
    1109px 1232px #fb0, 1532px 643px #fb0, 823px 1287px #fb0, 667px 34px #fb0,
    24px 1469px #fb0, 1029px 1130px #fb0, 1645px 254px #fb0, 1054px 1000px #fb0,
    1341px 254px #fb0, 184px 188px #fb0, 1160px 1521px #fb0, 348px 1083px #fb0,
    1436px 1796px #fb0, 441px 361px #fb0, 1239px 575px #fb0, 1055px 140px #fb0,
    1552px 502px #fb0, 607px 864px #fb0, 967px 1883px #fb0, 1407px 1955px #fb0,
    405px 1148px #fb0, 604px 992px #fb0, 1116px 506px #fb0, 13px 832px #fb0,
    295px 189px #fb0, 964px 1175px #fb0, 1988px 52px #fb0, 935px 209px #fb0,
    17px 142px #fb0, 770px 333px #fb0, 682px 633px #fb0, 510px 466px #fb0,
    366px 79px #fb0, 199px 954px #fb0, 882px 277px #fb0, 744px 655px #fb0,
    37px 1659px #fb0, 1217px 1885px #fb0, 1107px 597px #fb0, 1060px 1335px #fb0,
    773px 601px #fb0, 1939px 1632px #fb0, 1607px 1774px #fb0,
    1531px 1550px #fb0,
    1042px 60px #fb0, 850px 1502px #fb0, 1670px 492px #fb0, 1357px 1654px #fb0,
    1279px 1521px #fb0, 633px 1956px #fb0, 1122px 1981px #fb0, 661px 657px #fb0,
    521px 1132px #fb0, 1593px 813px #fb0, 1204px 1463px #fb0,
    1112px 1495px #fb0,
    1755px 367px #fb0, 1685px 1805px #fb0, 1982px 196px #fb0, 484px 51px #fb0,
    1041px 330px #fb0, 1487px 563px #fb0, 311px 1872px #fb0, 330px 976px #fb0,
    6px 1754px #fb0, 1447px 1182px #fb0, 1926px 148px #fb0, 1640px 490px #fb0,
    1548px 1357px #fb0, 1052px 1340px #fb0, 1083px 56px #fb0, 1890px 339px #fb0,
    277px 1609px #fb0, 892px 1792px #fb0, 1322px 86px #fb0, 1509px 1515px #fb0,
    1650px 1722px #fb0, 334px 497px #fb0, 888px 143px #fb0, 1325px 259px #fb0,
    1330px 1505px #fb0, 1374px 645px #fb0, 1184px 937px #fb0, 911px 1044px #fb0,
    32px 1257px #fb0, 297px 1884px #fb0, 1031px 963px #fb0, 411px 916px #fb0,
    243px 1305px #fb0, 898px 200px #fb0, 1550px 156px #fb0, 159px 716px #fb0,
    240px 1130px #fb0, 1046px 1905px #fb0, 1405px 1277px #fb0, 275px 124px #fb0,
    964px 795px #fb0, 1270px 1387px #fb0, 1391px 1880px #fb0, 484px 1027px #fb0,
    1681px 1706px #fb0, 1665px 697px #fb0, 1073px 1078px #fb0,
    1808px 1313px #fb0, 1669px 1266px #fb0, 1965px 747px #fb0,
    1734px 972px #fb0,
    1549px 1434px #fb0, 945px 146px #fb0, 1211px 1383px #fb0,
    1921px 1637px #fb0,
    271px 1725px #fb0, 739px 1725px #fb0, 1634px 1827px #fb0, 961px 1131px #fb0,
    513px 839px #fb0, 1553px 1725px #fb0, 82px 1667px #fb0, 3px 1797px #fb0,
    517px 1511px #fb0, 1644px 929px #fb0, 120px 1638px #fb0, 579px 1168px #fb0,
    147px 680px #fb0, 61px 1146px #fb0, 884px 598px #fb0, 630px 1324px #fb0,
    1709px 1340px #fb0, 1332px 1142px #fb0, 1990px 1397px #fb0,
    854px 1527px #fb0, 1293px 634px #fb0, 1063px 506px #fb0, 1361px 668px #fb0,
    926px 347px #fb0, 145px 1031px #fb0, 1289px 1519px #fb0, 1977px 1560px #fb0,
    70px 1353px #fb0, 653px 1634px #fb0, 1182px 340px #fb0, 1264px 1127px #fb0,
    1246px 40px #fb0, 428px 691px #fb0, 1531px 1817px #fb0, 431px 1906px #fb0,
    1406px 1665px #fb0, 597px 1588px #fb0, 1273px 355px #fb0, 995px 1018px #fb0,
    1319px 528px #fb0, 1454px 715px #fb0, 1587px 1052px #fb0, 921px 193px #fb0,
    1012px 479px #fb0, 689px 1019px #fb0, 1307px 420px #fb0, 1153px 108px #fb0,
    1343px 775px #fb0, 1236px 1061px #fb0, 1117px 1099px #fb0, 308px 533px #fb0,
    1262px 509px #fb0, 830px 24px #fb0, 426px 695px #fb0, 1148px 1397px #fb0,
    1016px 1719px #fb0, 1142px 1280px #fb0, 1841px 310px #fb0,
    1890px 1708px #fb0, 1399px 589px #fb0, 913px 1291px #fb0, 955px 1445px #fb0,
    431px 491px #fb0, 580px 1002px #fb0, 796px 186px #fb0, 445px 1634px #fb0,
    1543px 1377px #fb0, 1853px 57px #fb0, 34px 620px #fb0, 1056px 923px #fb0,
    1027px 134px #fb0, 1248px 1252px #fb0, 756px 1855px #fb0, 143px 654px #fb0,
    253px 347px #fb0, 181px 943px #fb0, 1044px 1774px #fb0, 367px 1925px #fb0,
    1125px 854px #fb0, 1276px 141px #fb0, 422px 413px #fb0, 1261px 973px #fb0,
    1030px 1349px #fb0, 1349px 1850px #fb0, 552px 1286px #fb0, 606px 888px #fb0,
    464px 1922px #fb0, 1799px 260px #fb0, 1984px 788px #fb0, 1210px 450px #fb0,
    1288px 1530px #fb0, 911px 1896px #fb0, 689px 4px #fb0, 806px 162px #fb0,
    1201px 604px #fb0, 908px 531px #fb0, 137px 1123px #fb0, 1165px 496px #fb0,
    1567px 1797px #fb0, 614px 504px #fb0, 1551px 1165px #fb0,
    1309px 1032px #fb0,
    1321px 26px #fb0, 1372px 326px #fb0, 1762px 1159px #fb0, 728px 5px #fb0,
    1364px 459px #fb0, 1333px 918px #fb0, 1082px 1732px #fb0, 286px 319px #fb0,
    1636px 1220px #fb0, 350px 966px #fb0, 124px 219px #fb0, 184px 1654px #fb0,
    1195px 160px #fb0, 1690px 737px #fb0, 1386px 472px #fb0, 1522px 1911px #fb0,
    1082px 1129px #fb0, 491px 67px #fb0, 826px 393px #fb0, 643px 632px #fb0,
    1934px 1461px #fb0, 1325px 316px #fb0, 934px 1722px #fb0, 1044px 879px #fb0,
    1109px 1482px #fb0, 1040px 642px #fb0, 801px 509px #fb0, 1352px 1583px #fb0,
    160px 339px #fb0, 1111px 1731px #fb0, 1650px 1190px #fb0,
    1804px 1019px #fb0,
    745px 604px #fb0, 1391px 1108px #fb0, 344px 708px #fb0, 395px 111px #fb0,
    913px 1180px #fb0, 537px 1036px #fb0, 1048px 1611px #fb0, 1926px 155px #fb0,
    392px 193px #fb0, 1980px 1465px #fb0, 1853px 1349px #fb0, 204px 1317px #fb0,
    1342px 1956px #fb0, 785px 1564px #fb0, 1478px 612px #fb0, 1459px 491px #fb0,
    1767px 265px #fb0, 1032px 495px #fb0, 946px 1196px #fb0, 607px 285px #fb0,
    887px 1940px #fb0, 1618px 962px #fb0, 85px 801px #fb0, 1828px 525px #fb0,
    523px 1927px #fb0, 280px 1676px #fb0, 551px 1133px #fb0, 1888px 936px #fb0,
    875px 863px #fb0, 395px 1954px #fb0, 155px 590px #fb0, 1924px 262px #fb0,
    1039px 1430px #fb0, 1356px 1816px #fb0, 978px 671px #fb0,
    1968px 1044px #fb0,
    1693px 15px #fb0, 266px 1506px #fb0, 1061px 224px #fb0, 690px 1132px #fb0,
    1149px 313px #fb0, 744px 898px #fb0, 848px 1851px #fb0, 296px 761px #fb0,
    55px 624px #fb0, 573px 131px #fb0, 483px 1869px #fb0, 157px 1304px #fb0,
    496px 489px #fb0, 729px 1730px #fb0, 163px 1023px #fb0, 1065px 1426px #fb0,
    1058px 865px #fb0, 1204px 1762px #fb0, 73px 527px #fb0, 668px 1237px #fb0,
    1px 259px #fb0, 1027px 107px #fb0, 1347px 842px #fb0, 720px 819px #fb0,
    97px 1047px #fb0, 474px 1262px #fb0, 1406px 1163px #fb0, 1620px 1312px #fb0,
    292px 423px #fb0, 1579px 1735px #fb0, 687px 305px #fb0, 1810px 1822px #fb0,
    1499px 241px #fb0, 1578px 1308px #fb0, 770px 1441px #fb0, 398px 646px #fb0,
    1186px 1423px #fb0, 6px 201px #fb0, 1684px 1057px #fb0, 1252px 1352px #fb0,
    1649px 317px #fb0, 746px 1777px #fb0, 537px 97px #fb0, 347px 1613px #fb0,
    1709px 1896px #fb0, 134px 957px #fb0, 755px 340px #fb0, 107px 1057px #fb0,
    263px 1459px #fb0, 1559px 1124px #fb0, 1082px 19px #fb0, 557px 795px #fb0,
    596px 455px #fb0, 1877px 1535px #fb0, 457px 320px #fb0, 532px 270px #fb0,
    773px 1991px #fb0, 644px 1840px #fb0, 777px 1413px #fb0, 726px 203px #fb0,
    20px 740px #fb0, 655px 909px #fb0, 396px 1998px #fb0, 235px 954px #fb0,
    1737px 264px #fb0, 670px 1532px #fb0, 498px 159px #fb0,
    540px 1997px #fb0,
    1792px 1327px #fb0, 880px 1023px #fb0, 1917px 1938px #fb0,
    1859px 148px #fb0,
    1147px 1781px #fb0, 428px 1876px #fb0, 1952px 605px #fb0, 655px 80px #fb0,
    1500px 1545px #fb0, 1656px 644px #fb0, 615px 247px #fb0, 795px 1881px #fb0,
    1750px 586px #fb0, 148px 1490px #fb0, 1434px 74px #fb0, 417px 1969px #fb0,
    962px 1526px #fb0, 835px 962px #fb0, 330px 1767px #fb0, 1557px 435px #fb0,
    240px 341px #fb0, 1857px 1589px #fb0, 765px 281px #fb0, 1452px 405px #fb0,
    1480px 1724px #fb0, 950px 1094px #fb0, 710px 1388px #fb0,
    1333px 1919px #fb0,
    706px 1589px #fb0, 1476px 1465px #fb0, 744px 291px #fb0, 123px 870px #fb0,
    1406px 428px #fb0, 727px 1609px #fb0, 1149px 1838px #fb0, 78px 169px #fb0,
    1088px 284px #fb0, 670px 399px #fb0, 711px 1923px #fb0, 42px 1720px #fb0,
    667px 570px #fb0, 1274px 693px #fb0, 1056px 644px #fb0, 1937px 793px #fb0,
    1200px 602px #fb0, 1493px 755px #fb0, 545px 870px #fb0, 887px 270px #fb0,
    1290px 164px #fb0, 265px 1185px #fb0;
}

#stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 236px 1043px #fb0, 784px 298px #fb0, 594px 611px #fb0,
    1790px 363px #fb0, 1099px 831px #fb0, 1619px 474px #fb0, 903px 652px #fb0,
    1472px 978px #fb0, 1620px 1445px #fb0, 1533px 1396px #fb0, 303px 994px #fb0,
    318px 1761px #fb0, 1755px 263px #fb0, 783px 482px #fb0, 1224px 216px #fb0,
    1625px 1456px #fb0, 813px 1703px #fb0, 1918px 1212px #fb0,
    1872px 799px #fb0,
    280px 793px #fb0, 1932px 99px #fb0, 1925px 1863px #fb0, 1444px 809px #fb0,
    879px 484px #fb0, 1283px 1275px #fb0, 154px 1516px #fb0, 1986px 404px #fb0,
    526px 774px #fb0, 540px 664px #fb0, 953px 1818px #fb0, 1931px 1100px #fb0,
    1105px 92px #fb0, 1290px 210px #fb0, 1739px 33px #fb0, 466px 1203px #fb0,
    1821px 139px #fb0, 1524px 269px #fb0, 777px 1345px #fb0, 116px 29px #fb0,
    692px 10px #fb0, 1165px 1444px #fb0, 230px 1666px #fb0, 1293px 811px #fb0,
    1349px 414px #fb0, 1598px 785px #fb0, 1058px 1829px #fb0,
    1995px 1740px #fb0,
    947px 614px #fb0, 141px 1062px #fb0, 1167px 248px #fb0, 1366px 1098px #fb0,
    811px 1344px #fb0, 1723px 872px #fb0, 1450px 1137px #fb0,
    1225px 1762px #fb0,
    1766px 144px #fb0, 1160px 1662px #fb0, 931px 589px #fb0, 937px 579px #fb0,
    941px 592px #fb0, 864px 681px #fb0, 41px 995px #fb0, 761px 1239px #fb0,
    1890px 1598px #fb0, 1262px 1800px #fb0, 1990px 990px #fb0,
    1259px 880px #fb0,
    1151px 1318px #fb0, 352px 1485px #fb0, 1345px 876px #fb0, 1446px 945px #fb0,
    1259px 1789px #fb0, 1290px 374px #fb0, 1388px 717px #fb0, 32px 1673px #fb0,
    1204px 862px #fb0, 1184px 1186px #fb0, 514px 574px #fb0, 1625px 279px #fb0,
    1491px 1821px #fb0, 990px 398px #fb0, 1552px 1243px #fb0,
    1427px 1528px #fb0,
    222px 808px #fb0, 732px 190px #fb0, 12px 1378px #fb0, 964px 444px #fb0,
    317px 267px #fb0, 1193px 161px #fb0, 401px 716px #fb0, 1399px 901px #fb0,
    547px 318px #fb0, 1365px 1943px #fb0, 1083px 1137px #fb0, 689px 251px #fb0,
    833px 1431px #fb0, 236px 177px #fb0, 103px 1987px #fb0, 320px 1421px #fb0,
    1938px 1277px #fb0, 1738px 1755px #fb0, 777px 1942px #fb0,
    480px 1451px #fb0,
    905px 1958px #fb0, 993px 1429px #fb0, 1748px 1796px #fb0, 1596px 79px #fb0,
    1355px 140px #fb0, 1914px 261px #fb0, 1027px 1239px #fb0, 242px 534px #fb0,
    1557px 192px #fb0, 1884px 88px #fb0, 1602px 296px #fb0, 872px 307px #fb0,
    998px 1373px #fb0, 38px 1192px #fb0, 763px 516px #fb0, 1463px 925px #fb0,
    1554px 147px #fb0, 1322px 2000px #fb0, 1885px 555px #fb0,
    1092px 1729px #fb0,
    259px 735px #fb0, 1852px 295px #fb0, 49px 1307px #fb0, 1111px 1808px #fb0,
    1939px 643px #fb0, 440px 1370px #fb0, 1386px 657px #fb0, 968px 611px #fb0,
    1270px 1739px #fb0, 870px 392px #fb0, 1257px 765px #fb0, 1106px 1530px #fb0,
    1232px 1910px #fb0, 1901px 1368px #fb0, 1027px 1105px #fb0,
    1787px 368px #fb0, 735px 375px #fb0, 1475px 825px #fb0, 1836px 518px #fb0,
    349px 1667px #fb0, 1260px 495px #fb0, 1799px 1574px #fb0, 1018px 682px #fb0,
    648px 995px #fb0, 935px 577px #fb0, 156px 1690px #fb0, 602px 1920px #fb0,
    1876px 384px #fb0, 1561px 1362px #fb0, 1446px 632px #fb0, 1923px 209px #fb0,
    1076px 1611px #fb0, 738px 722px #fb0, 1484px 1655px #fb0, 137px 1339px #fb0,
    1721px 541px #fb0, 1544px 1082px #fb0, 1083px 1601px #fb0,
    1475px 1526px #fb0, 1653px 1500px #fb0, 451px 1136px #fb0, 288px 372px #fb0,
    290px 810px #fb0, 1492px 814px #fb0, 1508px 1379px #fb0, 730px 1116px #fb0,
    505px 929px #fb0, 1775px 1887px #fb0, 1942px 1091px #fb0, 927px 1676px #fb0,
    406px 992px #fb0, 983px 626px #fb0, 1356px 741px #fb0, 1609px 936px #fb0,
    313px 1244px #fb0, 616px 984px #fb0, 713px 1281px #fb0, 1050px 844px #fb0,
    1010px 104px #fb0, 1858px 547px #fb0, 429px 1678px #fb0, 916px 763px #fb0,
    418px 378px #fb0, 7px 631px #fb0, 1702px 1288px #fb0, 799px 987px #fb0,
    1661px 1081px #fb0, 1655px 1846px #fb0, 361px 1676px #fb0,
    1979px 1521px #fb0, 415px 418px #fb0, 1641px 1999px #fb0, 955px 882px #fb0,
    1290px 324px #fb0, 930px 1826px #fb0, 989px 807px #fb0, 461px 917px #fb0;
  animation: animStar 100s linear infinite;
}
#stars2:after {
  content: ' ';
  position: absolute;
  top: 2000px;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 236px 1043px #fb0, 784px 298px #fb0, 594px 611px #fb0,
    1790px 363px #fb0, 1099px 831px #fb0, 1619px 474px #fb0, 903px 652px #fb0,
    1472px 978px #fb0, 1620px 1445px #fb0, 1533px 1396px #fb0, 303px 994px #fb0,
    318px 1761px #fb0, 1755px 263px #fb0, 783px 482px #fb0, 1224px 216px #fb0,
    1625px 1456px #fb0, 813px 1703px #fb0, 1918px 1212px #fb0,
    1872px 799px #fb0,
    280px 793px #fb0, 1932px 99px #fb0, 1925px 1863px #fb0, 1444px 809px #fb0,
    879px 484px #fb0, 1283px 1275px #fb0, 154px 1516px #fb0, 1986px 404px #fb0,
    526px 774px #fb0, 540px 664px #fb0, 953px 1818px #fb0, 1931px 1100px #fb0,
    1105px 92px #fb0, 1290px 210px #fb0, 1739px 33px #fb0, 466px 1203px #fb0,
    1821px 139px #fb0, 1524px 269px #fb0, 777px 1345px #fb0, 116px 29px #fb0,
    692px 10px #fb0, 1165px 1444px #fb0, 230px 1666px #fb0, 1293px 811px #fb0,
    1349px 414px #fb0, 1598px 785px #fb0, 1058px 1829px #fb0,
    1995px 1740px #fb0,
    947px 614px #fb0, 141px 1062px #fb0, 1167px 248px #fb0, 1366px 1098px #fb0,
    811px 1344px #fb0, 1723px 872px #fb0, 1450px 1137px #fb0,
    1225px 1762px #fb0,
    1766px 144px #fb0, 1160px 1662px #fb0, 931px 589px #fb0, 937px 579px #fb0,
    941px 592px #fb0, 864px 681px #fb0, 41px 995px #fb0, 761px 1239px #fb0,
    1890px 1598px #fb0, 1262px 1800px #fb0, 1990px 990px #fb0,
    1259px 880px #fb0,
    1151px 1318px #fb0, 352px 1485px #fb0, 1345px 876px #fb0, 1446px 945px #fb0,
    1259px 1789px #fb0, 1290px 374px #fb0, 1388px 717px #fb0, 32px 1673px #fb0,
    1204px 862px #fb0, 1184px 1186px #fb0, 514px 574px #fb0, 1625px 279px #fb0,
    1491px 1821px #fb0, 990px 398px #fb0, 1552px 1243px #fb0,
    1427px 1528px #fb0,
    222px 808px #fb0, 732px 190px #fb0, 12px 1378px #fb0, 964px 444px #fb0,
    317px 267px #fb0, 1193px 161px #fb0, 401px 716px #fb0, 1399px 901px #fb0,
    547px 318px #fb0, 1365px 1943px #fb0, 1083px 1137px #fb0, 689px 251px #fb0,
    833px 1431px #fb0, 236px 177px #fb0, 103px 1987px #fb0, 320px 1421px #fb0,
    1938px 1277px #fb0, 1738px 1755px #fb0, 777px 1942px #fb0,
    480px 1451px #fb0,
    905px 1958px #fb0, 993px 1429px #fb0, 1748px 1796px #fb0, 1596px 79px #fb0,
    1355px 140px #fb0, 1914px 261px #fb0, 1027px 1239px #fb0, 242px 534px #fb0,
    1557px 192px #fb0, 1884px 88px #fb0, 1602px 296px #fb0, 872px 307px #fb0,
    998px 1373px #fb0, 38px 1192px #fb0, 763px 516px #fb0, 1463px 925px #fb0,
    1554px 147px #fb0, 1322px 2000px #fb0, 1885px 555px #fb0,
    1092px 1729px #fb0,
    259px 735px #fb0, 1852px 295px #fb0, 49px 1307px #fb0, 1111px 1808px #fb0,
    1939px 643px #fb0, 440px 1370px #fb0, 1386px 657px #fb0, 968px 611px #fb0,
    1270px 1739px #fb0, 870px 392px #fb0, 1257px 765px #fb0, 1106px 1530px #fb0,
    1232px 1910px #fb0, 1901px 1368px #fb0, 1027px 1105px #fb0,
    1787px 368px #fb0, 735px 375px #fb0, 1475px 825px #fb0, 1836px 518px #fb0,
    349px 1667px #fb0, 1260px 495px #fb0, 1799px 1574px #fb0, 1018px 682px #fb0,
    648px 995px #fb0, 935px 577px #fb0, 156px 1690px #fb0, 602px 1920px #fb0,
    1876px 384px #fb0, 1561px 1362px #fb0, 1446px 632px #fb0, 1923px 209px #fb0,
    1076px 1611px #fb0, 738px 722px #fb0, 1484px 1655px #fb0, 137px 1339px #fb0,
    1721px 541px #fb0, 1544px 1082px #fb0, 1083px 1601px #fb0,
    1475px 1526px #fb0, 1653px 1500px #fb0, 451px 1136px #fb0, 288px 372px #fb0,
    290px 810px #fb0, 1492px 814px #fb0, 1508px 1379px #fb0, 730px 1116px #fb0,
    505px 929px #fb0, 1775px 1887px #fb0, 1942px 1091px #fb0, 927px 1676px #fb0,
    406px 992px #fb0, 983px 626px #fb0, 1356px 741px #fb0, 1609px 936px #fb0,
    313px 1244px #fb0, 616px 984px #fb0, 713px 1281px #fb0, 1050px 844px #fb0,
    1010px 104px #fb0, 1858px 547px #fb0, 429px 1678px #fb0, 916px 763px #fb0,
    418px 378px #fb0, 7px 631px #fb0, 1702px 1288px #fb0, 799px 987px #fb0,
    1661px 1081px #fb0, 1655px 1846px #fb0, 361px 1676px #fb0,
    1979px 1521px #fb0, 415px 418px #fb0, 1641px 1999px #fb0, 955px 882px #fb0,
    1290px 324px #fb0, 930px 1826px #fb0, 989px 807px #fb0, 461px 917px #fb0;
}

#stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 1948px 1304px #fb0, 255px 1453px #fb0, 146px 1809px #fb0,
    1216px 205px #fb0, 1418px 1507px #fb0, 206px 1111px #fb0, 734px 1490px #fb0,
    1985px 1787px #fb0, 188px 1154px #fb0, 1447px 113px #fb0,
    1484px 1176px #fb0,
    1495px 1763px #fb0, 1597px 453px #fb0, 1840px 1052px #fb0,
    655px 1587px #fb0,
    1171px 1430px #fb0, 1106px 410px #fb0, 97px 1054px #fb0, 714px 1158px #fb0,
    1877px 1980px #fb0, 181px 105px #fb0, 1387px 1624px #fb0, 485px 1406px #fb0,
    1770px 1868px #fb0, 1403px 770px #fb0, 204px 1690px #fb0, 300px 406px #fb0,
    103px 364px #fb0, 1376px 774px #fb0, 1885px 753px #fb0, 162px 822px #fb0,
    1944px 1848px #fb0, 500px 269px #fb0, 317px 1205px #fb0, 49px 905px #fb0,
    1897px 1698px #fb0, 1937px 84px #fb0, 1831px
    1273px #fb0, 1244px 1355px #fb0,
    731px 737px #fb0, 1536px 802px #fb0, 628px 394px #fb0, 1582px 1266px #fb0,
    1583px 668px #fb0, 1548px 1611px #fb0, 303px 945px #fb0, 1749px 980px #fb0,
    909px 732px #fb0, 645px 808px #fb0, 56px 1087px #fb0, 1320px 1359px #fb0,
    1053px 473px #fb0, 1783px 834px #fb0, 137px 1176px #fb0, 786px 1701px #fb0,
    656px 906px #fb0, 620px 793px #fb0, 1471px 423px #fb0, 1046px 108px #fb0,
    1849px 1270px #fb0, 1152px 1323px #fb0, 323px 623px #fb0, 304px 1154px #fb0,
    678px 1427px #fb0, 734px 955px #fb0, 1717px 674px #fb0, 1974px 1431px #fb0,
    859px 1871px #fb0, 822px 1386px #fb0, 1961px 1081px #fb0, 750px 1690px #fb0,
    1387px 547px #fb0, 776px 907px #fb0, 435px 1934px #fb0, 542px 321px #fb0,
    320px 754px #fb0, 622px 1759px #fb0, 1758px 597px #fb0, 742px 469px #fb0,
    638px 1795px #fb0, 1578px 1755px #fb0, 1881px
    1923px #fb0, 148px 1001px #fb0,
    1333px 1015px #fb0, 663px 453px #fb0, 166px 730px #fb0, 319px 1423px #fb0,
    1571px 1401px #fb0, 1538px 1363px #fb0, 851px 15px #fb0, 1884px 590px #fb0,
    1016px 778px #fb0, 1993px 1060px #fb0, 40px 444px #fb0, 667px 639px #fb0,
    1299px 1074px #fb0, 547px 923px #fb0, 93px 1476px #fb0, 1411px 1712px #fb0,
    535px 1825px #fb0;
  animation: animStar 150s linear infinite;
}
#stars3:after {
  content: ' ';
  position: absolute;
  top: 2000px;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 1948px 1304px #fb0, 255px 1453px #fb0, 146px 1809px #fb0,
    1216px 205px #fb0, 1418px 1507px #fb0, 206px 1111px #fb0, 734px 1490px #fb0,
    1985px 1787px #fb0, 188px 1154px #fb0, 1447px
    113px #fb0, 1484px 1176px #fb0,
    1495px 1763px #fb0, 1597px 453px #fb0, 1840px
    1052px #fb0, 655px 1587px #fb0,
    1171px 1430px #fb0, 1106px 410px #fb0, 97px 1054px #fb0, 714px 1158px #fb0,
    1877px 1980px #fb0, 181px 105px #fb0, 1387px 1624px #fb0, 485px 1406px #fb0,
    1770px 1868px #fb0, 1403px 770px #fb0, 204px 1690px #fb0, 300px 406px #fb0,
    103px 364px #fb0, 1376px 774px #fb0, 1885px 753px #fb0, 162px 822px #fb0,
    1944px 1848px #fb0, 500px 269px #fb0, 317px 1205px #fb0, 49px 905px #fb0,
    1897px 1698px #fb0, 1937px 84px #fb0, 1831px
    1273px #fb0, 1244px 1355px #fb0,
    731px 737px #fb0, 1536px 802px #fb0, 628px 394px #fb0, 1582px 1266px #fb0,
    1583px 668px #fb0, 1548px 1611px #fb0, 303px 945px #fb0, 1749px 980px #fb0,
    909px 732px #fb0, 645px 808px #fb0, 56px 1087px #fb0, 1320px 1359px #fb0,
    1053px 473px #fb0, 1783px 834px #fb0, 137px 1176px #fb0, 786px 1701px #fb0,
    656px 906px #fb0, 620px 793px #fb0, 1471px 423px #fb0, 1046px 108px #fb0,
    1849px 1270px #fb0, 1152px 1323px #fb0, 323px 623px #fb0, 304px 1154px #fb0,
    678px 1427px #fb0, 734px 955px #fb0, 1717px 674px #fb0, 1974px 1431px #fb0,
    859px 1871px #fb0, 822px 1386px #fb0, 1961px 1081px #fb0, 750px 1690px #fb0,
    1387px 547px #fb0, 776px 907px #fb0, 435px 1934px #fb0, 542px 321px #fb0,
    320px 754px #fb0, 622px 1759px #fb0, 1758px 597px #fb0, 742px 469px #fb0,
    638px 1795px #fb0, 1578px 1755px #fb0, 1881px
    1923px #fb0, 148px 1001px #fb0,
    1333px 1015px #fb0, 663px 453px #fb0, 166px 730px #fb0, 319px 1423px #fb0,
    1571px 1401px #fb0, 1538px 1363px #fb0, 851px 15px #fb0, 1884px 590px #fb0,
    1016px 778px #fb0, 1993px 1060px #fb0, 40px 444px #fb0, 667px 639px #fb0,
    1299px 1074px #fb0, 547px 923px #fb0, 93px 1476px #fb0, 1411px 1712px #fb0,
    535px 1825px #fb0;
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}
</style>