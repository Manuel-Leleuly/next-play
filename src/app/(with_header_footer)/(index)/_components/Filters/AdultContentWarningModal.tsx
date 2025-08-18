"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Eye, EyeOff, Shield, Users } from "lucide-react";
import { motion } from "motion/react";

export const AdultContentWarningModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="text-center">
          <motion.div
            className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </motion.div>

          <DialogTitle className="text-2xl text-center text-red-600 dark:text-red-400 uppercase">
            explicit content warning
          </DialogTitle>

          <DialogDescription className="text-center">
            You are about to access pornographic content
          </DialogDescription>
        </DialogHeader>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Alert className="border-red-200 dark:border-red-800">
            <Shield className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-700 dark:text-red-300">
              <strong className="uppercase">warning: </strong>This content
              contains explicit sexual material, nudity, and adult themes
              intended for viewers 18+ only.
            </AlertDescription>
          </Alert>

          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-4">
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-red-700 dark:text-red-300">
                  <strong>Age Verification Required:</strong> You must 18 years
                  or older to view this content.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Eye className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-red-700 dark:text-red-300">
                  <strong>Environment warning:</strong> Ensure you are in a
                  private setting. This content is NOT suitable for workplaces,
                  public spaces, or around minors.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <EyeOff className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-red-700 dark:text-red-300">
                  <strong>Legal Disclaimer:</strong> This application does not
                  host, create, or distribute pornographic content. We are not
                  responsible for any content accessed, legal consequences, or
                  personal effects resulting from viewing such material.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
            <p className="text-xs text-center text-muted-foreground">
              By proceeding, you acknowledge that you are accessing adult
              content voluntarily and at your own risk. You can disable this
              filter at any time.
            </p>
          </div>
        </motion.div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            variant={"outline"}
            onClick={onCancel}
            className="w-full sm:w-auto border-gray-300 hover:cursor-pointer"
          >
            Cancel
          </Button>

          <motion.div
            className="w-full sm:w-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onConfirm}
              className="w-full bg-red-600 hover:bg-red-700 text-white border-0 hover:cursor-pointer"
            >
              I Am 18+, Continue
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
