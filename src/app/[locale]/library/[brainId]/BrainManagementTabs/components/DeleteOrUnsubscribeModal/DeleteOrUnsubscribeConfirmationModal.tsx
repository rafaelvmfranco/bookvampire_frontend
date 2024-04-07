import { useTranslations } from "next-intl";

import { Modal } from "~/islands/ui/Modal/Modal";
import QuivrButton from "~/islands/ui/QuivrButton/QuivrButton";

type DeleteOrUnsubscribeConfirmationModalProps = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
  isOwnedByCurrentUser: boolean;
  isDeleteOrUnsubscribeRequestPending: boolean;
};

export const DeleteOrUnsubscribeConfirmationModal = ({
  isOpen,
  setOpen,
  onConfirm,
  isOwnedByCurrentUser,
  isDeleteOrUnsubscribeRequestPending,
}: DeleteOrUnsubscribeConfirmationModalProps): JSX.Element => {
  const t = useTranslations("deleteOrUnsubscribeFromBrain");

  return (
    <Modal
      desc={
        isOwnedByCurrentUser
          ? t("deleteConfirmQuestion")
          : t("unsubscribeConfirmQuestion")
      }
      isOpen={isOpen}
      setOpen={setOpen}
      size="auto"
      Trigger={<div />}
      CloseTrigger={<div />}
    >
      <div className="mt-10 flex flex-row items-center justify-center gap-20">
        <QuivrButton
          onClick={() => setOpen(false)}
          label={t("returnButton")}
          iconName="chevronLeft"
          color="primary"
        />
        <QuivrButton
          onClick={onConfirm}
          isLoading={isDeleteOrUnsubscribeRequestPending}
          color="dangerous"
          iconName="delete"
          label={
            isOwnedByCurrentUser
              ? t("deleteConfirmYes")
              : t("unsubscribeButton")
          }
        />
      </div>
    </Modal>
  );
};
