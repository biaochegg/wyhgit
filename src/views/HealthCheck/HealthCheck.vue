<template>	
<div class="app-container" >
<el-row style=padding-bottom:15px>
  <el-button type="primary" plain>PaaS组件健康状态检查</el-button>
</el-row>	

<el-table :data="list"  border style="width: 100%"  height=400px >
    <el-table-column
    	prop="Major"
      label="专业"
      align="center"
      sortable
      width="180"
      :filters="[{text: '物联网CRM', value: '物联网CRM'}, {text: '物联网计费', value: '物联网计费'}]"
      :filter-method="filterHandler"
    >
    <template slot-scope="scope">
          {{scope.row.Major}}
    </template>
    </el-table-column>
    
    <el-table-column
    	prop="Style"
      label="平台类型"
      sortable
      align="center"
      width="180"
      :filters="[{text: 'Ctgmq', value: 'Ctgmq'}, {text: 'Hadoop', value: 'Hadoop'}]"
      :filter-method="filterHandler"  
    >
    <template slot-scope="scope">
          {{scope.row.Style}}
    </template>       
    </el-table-column>
    
    <el-table-column
    	prop="Item"
      label="检查内容"
      align="center"
      >
      <template slot-scope="scope">
          {{scope.row.Item}}
      </template> 
    </el-table-column>
    
    <el-table-column
    	prop="Status"
    	align="center"
      label="健康状态"
      width="150"
      :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">      
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.Status === '是' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.Status}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>


<script>
import { selectUser } from '@/api/selectData'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      selectUser(this.listQuery).then(response => {
        console.log('response', response)
        console.log('selectUser', response.data)
        this.list = response.data
        this.listLoading = false
      })
    },
    formatter(row, column) {
      return row.Item
    },
    filterTag(value, row) {
      return row.Status === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}

</script>

