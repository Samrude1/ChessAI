import React from 'react';

interface SettingsModalProps {
    onClose: () => void;
    onUploadAppBackground: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onUploadBoardBackground: (e: React.ChangeEvent<HTMLInputElement>) => void;
    currentAppBg: string | null;
    currentBoardBg: string | null;
    onResetAppBg: () => void;
    onResetBoardBg: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    onClose,
    onUploadAppBackground,
    onUploadBoardBackground,
    currentAppBg,
    currentBoardBg,
    onResetAppBg,
    onResetBoardBg
}) => {
    return (
        <div className="fixed inset-0 z-[110] bg-black/90 flex items-center justify-center p-4">
            <div className="bg-black border-2 border-white p-1 w-full max-w-md shadow-[0_0_15px_white]">
                <div className="border border-white p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-white hover:bg-white hover:text-black px-2 py-0 border border-white text-lg font-bold"
                    >
                        X
                    </button>

                    <h2 className="text-2xl font-bold text-white mb-6 glow-text uppercase border-b border-white pb-2">
                        System Preferences
                    </h2>

                    <div className="space-y-8">
                        {/* App Background */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-white">MAIN TERMINAL WALLPAPER</label>
                            <div className="flex items-center gap-2">
                                <label className="flex-1 cursor-pointer bg-white/10 hover:bg-white hover:text-black text-white border border-white text-sm font-bold py-2 px-4 text-center transition-colors uppercase">
                                    [ UPLOAD DATA ]
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={onUploadAppBackground}
                                    />
                                </label>
                                {currentAppBg && (
                                    <button
                                        onClick={onResetAppBg}
                                        className="px-3 py-2 bg-blue-900/50 text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-black text-sm uppercase font-bold"
                                    >
                                        RESET
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Board Background */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-white">BOARD TEXTURE MAP</label>
                            <div className="flex items-center gap-2">
                                <label className="flex-1 cursor-pointer bg-white/10 hover:bg-white hover:text-black text-white border border-white text-sm font-bold py-2 px-4 text-center transition-colors uppercase">
                                    [ UPLOAD TEXTURE ]
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={onUploadBoardBackground}
                                    />
                                </label>
                                {currentBoardBg && (
                                    <button
                                        onClick={onResetBoardBg}
                                        className="px-3 py-2 bg-blue-900/50 text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-black text-sm uppercase font-bold"
                                    >
                                        RESET
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white border-dashed">
                        <button
                            onClick={onClose}
                            className="w-full bg-white text-black font-bold py-2 px-4 uppercase hover:bg-gray-200 transition-colors shadow-[0_0_10px_white]"
                        >
                            Save & Exit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;