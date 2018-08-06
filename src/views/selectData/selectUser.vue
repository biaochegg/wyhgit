<template>
  <div class="app-container" >
  	
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column
      prop="Major"
      label="专业"
      sortable
      width="150"
      :filters="[{text: '物联网CRM', value: '物联网CRM'}, {text: '物联网计费', value: '物联网计费'}]"
      :filter-method="filterHandler"
      align="center">
        <template slot-scope="scope">
          {{scope.row.Major}}
        </template>
      </el-table-column>
      <el-table-column 
      prop="Style"
      label="平台类型"
      sortable
      width="150"
      :filters="[{text: 'Ctgmq', value: 'Ctgmq'}, {text: 'Hadoop', value: 'Hadoop'}]"
      :filter-method="filterHandler" 	
      align="center">
        <template slot-scope="scope">
          <span>{{scope.row.Style}}</span>
        </template>
      </el-table-column>
      <el-table-column label="维护作业"  align="center">
        <template slot-scope="scope">
          {{scope.row.Item}}
        </template>
      </el-table-column>
      <el-table-column 
      prop="Status"
      label="是否完成"
      width="150"
      :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
      class-name="status-col" 
      align="center">
        <template slot-scope="scope">
          <el-tag > {{scope.row.Status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="执行人员"  width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.Person}}
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
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
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

