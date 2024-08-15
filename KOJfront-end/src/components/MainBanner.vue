<template>
    <div>
        <div class="question">
            <div class="smallfix"></div>
            <div class="list-head">
                <div>
                    <div class="listtag">
                        <div class="listtag-title">问题列表</div>
                        <div class="listtag-muted">List Of Questions</div>
                    </div>
                </div>
                <div class="question">
                    <!-- 。。。。。。 -->
                </div>
            </div>
            <div>
                <div>
                    <table class="table index-list">
                        <thead>
                            <tr>
                                <th></th>
                                <th><a href="#">题号</a></th>
                                <th><a href="#">标题</a></th>
                                <th><a href="#">标签</a></th>
                                <th><a href="#">难度</a></th>
                                <th><a href="#">正确</a></th>
                            </tr>
                        </thead>
                        <tbody class="tbody">
                            <tr>
                                <td></td>
                                <td><a href="#" target="_blank">001</a></td>
                                <td><a href="#" target=" _blank">编程求解1+2+3+...+n</a></td>
                                <td><span class="problem-list-tags"><a href="#"><span
                                                class="label label-warning">简单循环</span></a></span>
                                </td>
                                <td><span class="label label-success">入门</span></td>
                                <td style="text-align:center;vertical-align: middle;"><a href="#">880</a></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><a href="#" target=" _blank">002</a></td>
                                <td><a href="#" target="_blank">编程求1+3+5+...+n</a></td>
                                <td><span class="problem-list-tags"><a href="#"><span
                                                class="label label-info">简单循环</span></a></span>
                                </td>
                                <td><span class="label label-success">入门</span></td>
                                <td style="text-align:center;vertical-align: middle;"><a href="#">661</a></td>
                            </tr>
                        </tbody>
                    </table>
                    <ul class="page">
                        <li><span>«</span></li>
                        <li class="active"><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li><a href="#">6</a></li>
                        <li class="next"><a href="#">»</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="panel-two">
            <div>
                <div class="panel-heading">栏目</div>
                <div class="panel-body-two">
                    <ul class="tag-group-two">
                        <li>基础入门栏目</li>
                        <li>突破进阶栏目</li>
                        <li>终极提升栏目</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="panel">
            <div>
                <div class="panel-heading">标签</div>
                <div class="panel-body">
                    <ul class="tag-group">
                        <li class="taggroup-item-index"><a href="#">字符串</a>
                        </li>
                        <li class="taggroup-item-index"><a href="#">结构体</a>
                        </li>
                        <li class="taggroup-item-index"><a href="#">循环</a>
                        </li>
                        <li class="taggroup-item-index"><a href="#">数组问题</a>
                        </li>
                        <li class="taggroup-item-index"><a href="#">链表</a>
                        </li>
                        <li class="taggroup-item-index"><a href="#">指针</a>
                        </li>
                        <li class="taggroup-item-index"><a href="#">字符串</a>
                        </li>
                        <li class="taggroup-item-index"><a href="#">结构体</a>
                        </li>
                        <li class="taggroup-item-index"><a href="#">循环</a>
                        </li>
                        <li class="taggroup-item-index"><a href="#">数组问题</a>
                        </li>
                        <li class="taggroup-item-index"><a href="#">链表</a>
                        </li>
                        <li class="taggroup-item-index"><a href="#">指针</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="MainBanner">

</script>
<style>
.taggroup-item-index {
    display: inline-block;
    margin-right: 3px;
    margin-bottom: 5px;
    padding: 5px 7px;
    border-radius: 2px;
    font-size: 12px;
    text-decoration: none;
    white-space: nowrap;
    transition-timing-function: ease;
    transition-duration: 0.2s;
    transition-property: background-color;
    color: #757575;
    background-color: #e9ecf9;
}

.tag-group {
    padding: 0;
}

.tag-group li {
    margin-top: 5px;
    margin-left: 5px;
}

.tag-group ul {
    display: block;
    padding-left: 30px;
}

.tag-group ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.page li {
    line-height: 1.5;
}

.panel-body {
    padding: 15px;
}

.panel-heading {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    color: #333;
    background-color: rgba(223, 231, 240);
    border-color: #ddd;
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}

.panel-two {
    width: 22vw;
    position: absolute;
    right: 6%;
    top: 113px;
    background-color: #fefefe;
    border: 1px solid #bbc9d4;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    color: #134c89;
}
.panel {
    width: 22vw;
    position: absolute;
    right: 6%;
    top: 313px;
    background-color: #fefefe;
    border: 1px solid #bbc9d4;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.question {
    width: 61vw;
    margin-left: 6%;
    margin-top: 40px;
    padding: 20px;
}

.tbody {
    background-color: #fff;
}

.list-head {
    background-color: #dfe7f0;
    color: rgb(27, 71, 125);
    padding: 15px 0;
}

.index-list th {
    background-color: #dfe7f0;
    color: white;
}

.listtag-title {
    font-size: 24px;
    font-weight: bold;
}

.listtag-muted {
    font-size: 14px;
}

.page {
    /* display: inline-block; */
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
}

.page li {
    display: flex;
    margin-left: 10px;
    float: left;
}

.page li a {
    color: #134c89;
    padding: 8px 16px;
    border: 1px solid #134c89;
    border-radius: 5px;
}

.page li.active a {
    background-color: #134c89;
    color: white;
}

.index-list {
    width: 100%;
    border-collapse: collapse;
}

.index-list th,
.index-list td {
    border: 1px solid #dee2e6;
    padding: 10px;
    text-align: left;
}



.problem-list-tags a {
    /* background-color: #e9ecef; */
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 5px;
}



.index-list,
.table-top-border {
    border-top: 2px solid #134c89;
}

.table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
}

table {
    background-color: transparent;
}

table {
    border-spacing: 0;
    border-collapse: collapse;
}

.label-warning {
    border: 1px solid #D26719;
    color: #D26719;
    background-color: #FEEACC;
}

.label {
    font-weight: normal;
    padding: 0.3em 0.6em 0.3em 0.6em;
    border: 1px;
    font-size: 12px;
    border-radius: 5px;
}

.label-success {
    border: 1px solid #3EA86F;
    color: #3EA86F;
    background-color: #E0F7D7;
}

.label-info {
    border: 1px solid #e5c8ec;
    color: #6e3781;
    background-color: #f0cff0;
    border-radius: 5px;
}

</style>