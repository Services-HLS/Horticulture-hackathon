import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sprout, Trash2, Plus, Leaf } from "lucide-react";
import { useFarmerCrops } from "@/contexts/FarmerContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FarmerMyCrops = () => {
  const { t } = useLanguage();
  const { selectedCrops: selected, toggleCrop, allCrops: crops, addCustomCrop, deleteCustomCrop } = useFarmerCrops();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCropName, setNewCropName] = useState("");
  const [newCropSeason, setNewCropSeason] = useState("Year-round");

  const myCrops = crops.filter(c => selected.includes(c.id));
  const availableCrops = crops.filter(c => !selected.includes(c.id));

  const handleAdd = (id: string, name: string) => {
    toggleCrop(id);
    toast.success(t(`${name} added to your crops!`, `${name} మీ పంటలకు జోడించబడింది!`), {
      icon: <Sprout className="h-4 w-4 text-green-500" />
    });
  };

  const handleRemove = (id: string, name: string, isCustom?: boolean) => {
    if (isCustom) {
      deleteCustomCrop(id);
      toast.info(t(`${name} permanently deleted.`, `${name} శాశ్వతంగా తీసివేయబడింది.`), {
        icon: <Trash2 className="h-4 w-4 text-destructive" />
      });
    } else {
      toggleCrop(id);
      toast.info(t(`${name} removed from your crops.`, `${name} మీ పంటల నుండి తీసివేయబడింది.`), {
        icon: <Trash2 className="h-4 w-4 text-destructive" />
      });
    }
  };

  const handleCreateCustomCrop = () => {
    if (!newCropName.trim()) return;
    const cropId = newCropName.toLowerCase().replace(/\s+/g, '-');

    // Check if it already exists
    if (crops.find(c => c.id === cropId)) {
      toast.error(t("Crop already exists!", "పంట ఇప్పటికే ఉంది!"));
      return;
    }

    addCustomCrop({
      id: cropId,
      name: newCropName,
      nameTE: newCropName, // Fallback
      icon: "🌱",
      image: "/images/crops/default.png",
      season: newCropSeason,
      isCustom: true
    });

    toast.success(t(`${newCropName} created and added!`, `${newCropName} సృష్టించబడింది మరియు జోడించబడింది!`), {
      icon: <Sprout className="h-4 w-4 text-green-500" />
    });

    setNewCropName("");
    setNewCropSeason("Year-round");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-8 animate-slide-in pb-10">
      <div>
        <h1 className="page-header">{t("My Crops Dashboard", "నా పంటల డాష్‌బోర్డ్")}</h1>
        <p className="page-subtitle">{t("Manage the crops you cultivate to personalize your experience", "మీ అనుభవాన్ని వ్యక్తిగతీకరించడానికి మీరు సాగు చేసే పంటల జాబితాను నిర్వహించండి")}</p>
      </div>

      <div className="bg-primary/5 border border-primary/20 p-5 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sprout className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-primary">{t("My Current Crops", "నా ప్రస్తుత పంటలు")}</h2>
          </div>
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            {myCrops.length} {t("Crops Added", "పంటలు జోడించబడ్డాయి")}
          </span>
        </div>

        {myCrops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myCrops.map(c => (
              <div key={c.id} className="bg-card border-l-4 border-l-primary shadow-sm rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 h-14 w-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
                    {c.image ? <img src={c.image} alt={c.name} className="w-full h-full object-cover" /> : <span className="text-3xl">{c.icon}</span>}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight flex items-center gap-2">
                      {t(c.name, c.nameTE)}
                      {c.isCustom && <span className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded uppercase tracking-wider">Custom</span>}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full w-max mt-1">{c.season}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(c.id, t(c.name, c.nameTE), c.isCustom)}
                  className={`p-2.5 rounded-full transition-colors shadow-sm ${c.isCustom ? 'bg-destructive/10 text-destructive hover:bg-destructive hover:text-white' : 'bg-muted text-muted-foreground hover:text-white hover:bg-destructive'}`}
                  aria-label="Delete"
                  title={c.isCustom ? t("Delete Custom Crop", "కస్టమ్ పంటను తీసివేయండి") : t("Remove Crop", "పంటను తీసివేయండి")}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-xl border border-dashed mb-4">
            <Leaf className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
            <p className="text-muted-foreground font-medium">{t("You haven't added any crops yet.", "మీరు ఇంకా ఏ పంటలను జోడించలేదు.")}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("Select from the available crops below.", "దిగువ ఉన్న పంటలను ఎంచుకుని జోడించండి.")}</p>
          </div>
        )}
      </div>

      <div className="bg-card p-6 rounded-xl border shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-bold">{t("Add More Crops", "మరిన్ని పంటలను జోడించండి")}</h2>
          </div>

          {/* Custom Crop Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                <Plus className="h-4 w-4 mr-1" /> {t("Create Custom Crop", "కొత్త పంటను సృష్టించండి")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("Add a New Crop", "కొత్త పంటను జోడించండి")}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right text-sm font-medium">
                    {t("Crop Name", "పంట పేరు")}
                  </label>
                  <Input
                    id="name"
                    value={newCropName}
                    onChange={(e) => setNewCropName(e.target.value)}
                    placeholder="e.g. Cotton"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="season" className="text-right text-sm font-medium">
                    {t("Season", "సీజన్")}
                  </label>
                  <Input
                    id="season"
                    value={newCropSeason}
                    onChange={(e) => setNewCropSeason(e.target.value)}
                    placeholder="e.g. Kharif"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                  {t("Cancel", "రద్దు చేయండి")}
                </Button>
                <Button onClick={handleCreateCustomCrop}>
                  {t("Save Crop", "పంటను సేవ్ చేయండి")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {availableCrops.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableCrops.map(c => (
              <button
                key={c.id}
                onClick={() => handleAdd(c.id, t(c.name, c.nameTE))}
                className="kpi-card text-center hover:border-primary/40 hover:bg-primary/5 hover:shadow-md transition-all group flex flex-col items-center justify-center p-6 relative overflow-hidden border-2 border-dashed"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-colors z-0" />
                <div className="h-14 w-14 mb-3 rounded-full overflow-hidden bg-primary/5 flex items-center justify-center relative z-10 group-hover:-translate-y-1 transition-transform">
                  {c.image ? <img src={c.image} alt={c.name} className="w-full h-full object-cover" /> : <span className="text-3xl">{c.icon}</span>}
                </div>
                <p className="font-bold text-base relative z-10">{t(c.name, c.nameTE)}</p>
                <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-primary bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground px-4 py-2 rounded-full w-full transition-colors relative z-10 shadow-sm">
                  <Plus className="h-3.5 w-3.5" /> {t("Add Crop", "జోడించండి")}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground text-sm bg-muted/30 rounded-lg border border-dashed">
            <Sprout className="h-8 w-8 mx-auto mb-2 text-primary opacity-50" />
            {t("You have added all available default crops.", "మీరు అందుబాటులో ఉన్న అన్ని పంటలను జోడించారు.")}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerMyCrops;
