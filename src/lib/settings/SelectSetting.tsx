// // src/constants/SelectSetting.tsx
// import React from "react";
// // import { Picker } from "@react-native-picker/picker";
// import { SettingBase } from "./SettingBase";
// import { SettingsType } from "@/types/settings";

// export class SelectSetting extends SettingBase {
//   private options: string[];
//   private selected: string;
//   private onChange: (value: string) => void;

//   constructor(
//     key: string,
//     label: string,
//     iconName: string,
//     options: string[],
//     selected: string,
//     onChange: (value: string) => void
//   ) {
//     super(SettingsType.SELECT, key, label, iconName);
//     this.options = options;
//     this.selected = selected;
//     this.onChange = onChange;
//   }

//   render() {
//     return (
//       <Picker
//         selectedValue={this.selected}
//         onValueChange={(val) => {
//           this.selected = val as string;
//           this.onChange(val as string);
//         }}
//         style={{ width: 150, margin: 12 }}
//       >
//         {this.options.map((o) => (
//           <Picker.Item key={o} label={o} value={o} />
//         ))}
//       </Picker>
//     );
//   }
// }
