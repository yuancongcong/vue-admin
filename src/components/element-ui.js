import {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Icon,
  Row,
  Col,
  Cascader,
  Radio,
  RadioGroup,
  RadioButton,
  //   Checkbox,
  //   CheckboxButton,
  //   CheckboxGroup,
  //   Tree,
  //   Autocomplete,
  //  InputNumber,
  //   Select,
  //   Option,
  //   OptionGroup,
  Notification,
  Message,
  MessageBox,
  Loading,
} from 'element-ui'

const components = [
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Icon,
  Row,
  Col,
  Cascader,
  Radio,
  RadioGroup,
  RadioButton,
  //   Checkbox,
  //   CheckboxButton,
  //   CheckboxGroup,
  //   Tree,
  //   Autocomplete,
  //  InputNumber,
  //   Select,
  //   Option,
  //   OptionGroup,
];

// 导出组件
export default {
  install: function (Vue) {
    components.map(component => {
      Vue.component(component.name, component);
    });

    Vue.use(Loading.directive);

    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message = Message;
  }
}
