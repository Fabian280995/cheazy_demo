import { DateSelect } from "@/components/meal-slots/DateSelect";
import MealSlotSelect from "@/components/meal-slots/MealSlotSelect";
import { QuantitySelect } from "@/components/meal-slots/QuantitySelect";
import { AddButton } from "@/components/shared/AddButton";
import { useTheme } from "@/providers/theme";
import { MealSlot } from "@/types";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useEffect } from "react";
import { View } from "react-native";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  quantity: number;
  setQuantity: (value: number) => void;
  datetime: Date;
  setDatetime: (date: Date) => void;
  mealSlot: MealSlot;
  setMealSlot: (slot: MealSlot) => void;
  isLoading?: boolean;
  type?: "food" | "recipe";
  update?: boolean;
}

const AddMealEntryBottomSheet = ({
  open,
  onClose,
  onAdd,
  quantity,
  setQuantity,
  datetime,
  setDatetime,
  mealSlot,
  setMealSlot,
  isLoading = false,
  type = "food",
  update = false,
}: Props) => {
  const { colors } = useTheme();
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const label = update
    ? "Aktualisieren"
    : mealSlot
    ? `Zu ${mealSlot.label} hinzufügen`
    : "Hinzufügen";

  useEffect(() => {
    if (open) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [open]);

  const handleClose = () => {
    onClose();
    bottomSheetRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={["30%", "50%"]}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: colors.foreground,
      }}
      handleIndicatorStyle={{ backgroundColor: colors.textLight }}
      style={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
      stackBehavior="replace"
      onDismiss={handleClose}
    >
      <BottomSheetView
        style={{
          paddingHorizontal: 16,
          gap: 24,
          paddingTop: 16,
          paddingBottom: 46,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {datetime && <DateSelect date={datetime} onPress={setDatetime} />}
          {mealSlot && (
            <MealSlotSelect mealSlot={mealSlot} onChangeSlot={setMealSlot} />
          )}
          <QuantitySelect
            quantity={quantity}
            onChangeQuantity={setQuantity}
            step={type === "food" ? 10 : 0.1}
          />
        </View>
        <AddButton
          onPress={onAdd}
          label={label}
          loading={isLoading}
          disabled={isLoading || quantity <= 0 || !datetime || !mealSlot}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default AddMealEntryBottomSheet;
