import Link from "../models/links.model.js";

export const getLinks = async (req,res) => {
    const links = await Link.find({
        user: req.user.id
    }).populate('user');
    res.json(links)
}

export const createLink = async(req,res) => {
    try {
        const { pagina, enlace } = req.body;
        const newLink = new Link({
            pagina,
            enlace,
            user: req.user.id,
        });
        const linkSaved = await newLink.save();
        res.json(linkSaved);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getLink = async(req,res) => {
    const link = await Link.findById(req.params.id);
    if(!link) return res.status(404).json({ message: "Link no encontrado" });
    res.json(link)
}

export const deleteLink = async(req, res) => {
    const link = await Link.findByIdAndDelete(req.params.id);
    if(!link) return res.status(404).json({ message: "Link no encontrado" });
    res.json(link)
}

export const updateLink = async (req, res) => {
    try {
      const { pagina, enlace } = req.body;
      const linkUpdated = await Link.findOneAndUpdate(
        { _id: req.params.id },
        { pagina, enlace },
        { new: true }
      );
      return res.json(linkUpdated);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
