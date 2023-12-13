/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { Button, SxProps, Theme, Alert, Stack } from "@mui/material";
import { FormEvent, ReactNode } from "react";
import { FormProvider } from "react-hook-form";

type Props = {
  onSubmit?: (() => void) | ((event: FormEvent<HTMLFormElement>) => void);
  onSaveButton?: () => void;
  form?: any;
  loading?: boolean;
  children?: ReactNode;
  primaryButtonText?: string;
  error?: string;
  buttonSx?: SxProps<Theme>;
  withSpacing?: boolean;
  buttonFullWidth?: boolean;
  formId?: string;
  isDisabled?: boolean;
  direction?: "row" | "column";
  contentClassName?: string;
  buttonClassName?: string;
  className?: string;
};

const Form = ({
  onSubmit,
  form,
  error,
  children,
  primaryButtonText,
  loading,
  withSpacing,
  buttonSx,
  formId,
  contentClassName,
  buttonClassName,
  className,
  buttonFullWidth = false,
  isDisabled = true,
  direction = "column"
}: Props) => {
  const {
    formState: { isDirty, isValid },
    getFieldState
  } = form;

  return (
    <FormProvider {...form}>
      <form
        id={formId}
        onSubmit={onSubmit}
        className="flexColumn stretchSelf flex1"
      >
        {error && (
          <Alert severity="error" sx={{ mt: 1.5 }} className="stretchSelf">
            {error}
          </Alert>
        )}
        <div
          className={cx(
            direction === "row" ? "flexRow" : "flexColumn",
            "flex1 stretchSelf spaceBetween",
            className
          )}
        >
          <div className={cx("stretchSelf", contentClassName)}>
            {withSpacing ? (
              <Stack direction={direction} spacing={1} className="flex1">
                {children}
              </Stack>
            ) : (
              children
            )}
          </div>
          {!formId && (
            <Stack
              direction="row"
              spacing={2}
              alignSelf="stretch"
              className="spaceBetween"
            >
              <Button
                type="submit"
                variant="contained"
                className={cx(
                  direction === "column" ? "endSelf" : "",
                  buttonClassName
                )}
                sx={buttonSx}
                disabled={
                  isDisabled &&
                  (!isDirty || getFieldState().invalid || !isValid)
                }
                fullWidth={buttonFullWidth}
              >
                <Stack direction="row" spacing={2}>
                  {loading ? "..." : primaryButtonText}
                </Stack>
              </Button>
            </Stack>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;
