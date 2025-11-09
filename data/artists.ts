export type Artist = 
  // 15th Century
  'Andrei Rublev' | 'Theophanes the Greek' | 'Gentile da Fabriano' | 'Cennino Cennini' | 'Melchior Broederlam' | 
  'Leonardo da Vinci' | 'Albrecht Dürer' | 'Sandro Botticelli' | 'Raphael Sanzio' | 'Fra Filippo Lippi' |
  'Sesshū Tōyō' | 'Kanō Masanobu' |
  // 16th Century
  'Michelangelo Buonarroti' | 'Titian' | 'Caravaggio' | 'Giovanni Bellini' | 'Pieter Bruegel the Elder' |
  'El Greco' | 'Albrecht Altdorfer' | 'Francesco Guardi' | 'Kanō Eitoku' | 'Hasegawa Tōhaku' |
  // 17th Century
  'Rembrandt van Rijn' | 'Diego Velázquez' | 'Peter Paul Rubens' | 'Jusepe de Ribera' | 'Johannes Vermeer' |
  'Nicolas Poussin' | 'Georges de La Tour' | 'Artemisia Gentileschi' | 'Jacob Jordaens' | 'Tawaraya Sōtatsu' | 'Hishikawa Moronobu' |
  // 18th Century
  'Jean-Antoine Watteau' | 'Jean-Baptiste-Siméon Chardin' | 'Canaletto' | 'Jean-Étienne Liotard' | 'François Boucher' |
  'Joshua Reynolds' | 'Thomas Gainsborough' | 'Giovanni Battista Tiepolo' | 'Marie-Anne Coustou' | 'Sébastien Constant' |
  'Suzuki Harunobu' | 'Kitagawa Utamaro' |
  // 19th Century
  'Viktor Vasnetsov' | 'Vasily Surikov' | 'Ivan Aivazovsky' | 'Isaac Levitan' | 'Orest Kiprensky' |
  'Édouard Manet' | 'Paul Cézanne' | 'Claude Monet' | 'Edgar Degas' | 'Gustave Courbet' |
  'Katsushika Hokusai' | 'Utagawa Hiroshige' |
  // 20th Century
  'Pablo Picasso' | 'Wassily Kandinsky' | 'Frida Kahlo' | 'Marc Chagall' | 'Salvador Dalí' |
  'Andy Warhol' | 'Jackson Pollock' | 'Paul Klee' | 'Kazimir Malevich' | 'Roy Lichtenstein' |
  'Yokoyama Taikan' | 'Yayoi Kusama';


export const artistPrompts: Record<Artist, string> = {
  // 15th Century
  'Andrei Rublev': "Transform this photo into a serene icon painting in the style of Andrei Rublev. Emphasize spiritual, elongated figures, a harmonious and gentle color palette of light blues, golds, and soft reds, and the traditions of Byzantine iconography to create a sense of divine tranquility.",
  'Theophanes the Greek': "Transform this photo into a powerful icon painting in the style of Theophanes the Greek. Use expressive, almost dramatic brushwork, a limited but strong color palette, and create a deep psychological intensity in the figures, reflecting the Hesychast spiritual tradition.",
  'Gentile da Fabriano': "Transform this photo into an opulent painting in the International Gothic style of Gentile da Fabriano. Emphasize rich textures, decorative patterns, and a fairy-tale-like atmosphere. Use extensive gold leaf effects and vibrant colors to create a scene of courtly elegance.",
  'Cennino Cennini': "Transform this photo into a tempera painting following the techniques of Cennino Cennini. Recreate the style of late Giotto, focusing on clear outlines, simple compositions, and the formal, devotional quality of early Renaissance art.",
  'Melchior Broederlam': "Transform this photo into an Early Netherlandish painting in the style of Melchior Broederlam. Combine rich, decorative details of the International Gothic style with an early attempt at naturalism and perspective. Use vibrant colors and depict detailed architectural and landscape elements.",
  'Leonardo da Vinci': "Transform this photo into a masterpiece in the style of Leonardo da Vinci. Emphasize 'sfumato' for smoky, soft transitions, anatomical precision, psychological depth in expressions, and a harmonious, pyramidal composition to capture the essence of the High Renaissance.",
  'Albrecht Dürer': "Transform this photo into a Northern Renaissance work in the style of Albrecht Dürer. Combine Italian Renaissance principles with meticulous Northern attention to detail. Focus on precise lines, realistic textures, complex compositions, and symbolic details, as if it were a woodcut or engraving.",
  'Sandro Botticelli': "Transform this photo into an elegant tempera painting in the style of Sandro Botticelli. Emphasize graceful, flowing lines, delicate figures with a sense of melancholy beauty, and a decorative, linear quality. The composition should have a sense of rhythm and harmony.",
  'Raphael Sanzio': "Transform this photo into a High Renaissance painting in the style of Raphael. Focus on clarity of form, ease of composition, and serene beauty. Emphasize harmony, grace, and the Neoplatonic ideal of human grandeur.",
  'Fra Filippo Lippi': "Transform this photo into an Early Renaissance painting in the style of Fra Filippo Lippi. Recreate the warmth and humanity of his figures, with tender expressions, soft modeling of forms, and a focus on intimate, devotional scenes with beautiful, flowing lines.",
  'Sesshū Tōyō': "Transform this photo into a master suibokuga (ink wash painting) in the style of Sesshū Tōyō. Emphasize strong, calligraphic brushstrokes ('haboku' or 'broken ink' technique), sharp contrasts, and a deep sense of Zen philosophy. The composition should be dynamic and express the essence of the landscape.",
  'Kanō Masanobu': "Transform this photo into a painting in the style of the founder of the Kanō school, Masanobu. Combine the bold techniques of Chinese ink painting with the decorative colors and patterns of Japanese Yamato-e. The result should be a harmonious blend of strength and elegance.",
  
  // 16th Century
  'Michelangelo Buonarroti': "Transform this photo into a powerful High Renaissance fresco in the style of Michelangelo. Emphasize sculptural, muscular figures ('terribilità'), dynamic and complex poses, vibrant colors, and a sense of monumental grandeur and divine power.",
  'Titian': "Transform this photo into a Venetian School masterpiece in the style of Titian. Focus on deep, rich colors, expressive and visible brushwork, a mastery of light and shadow, and a powerful sense of drama and humanity.",
  'Caravaggio': "Transform this photo into a dramatic Baroque painting in the style of Caravaggio. Emphasize 'tenebrism'—intense, high-contrast lighting with deep shadows and brilliant highlights. Focus on raw realism, psychological intensity, and a sense of immediate, unfolding drama.",
  'Giovanni Bellini': "Transform this photo into a serene oil painting in the style of Giovanni Bellini. Emphasize rich, luminous colors, soft atmospheric light, and a devotional, tranquil mood. The composition should be balanced and harmonious.",
  'Pieter Bruegel the Elder': "Transform this photo into a crowded Northern Renaissance scene in the style of Pieter Bruegel the Elder. Recreate a panoramic landscape filled with detailed figures from peasant life, emphasizing a narrative, often allegorical, quality.",
  'El Greco': "Transform this photo into a Mannerist painting in the style of El Greco. Emphasize elongated, tormented figures, cold, flickering colors, dramatic lighting, and a mystical, spiritual intensity that transcends the natural world.",
  'Albrecht Altdorfer': "Transform this photo into a Danube School painting in the style of Albrecht Altdorfer. Focus on an expressive, atmospheric landscape that dominates the figures. Use imaginative color and light to create a poetic and mystical mood.",
  'Francesco Guardi': "Transform this photo into a Venetian cityscape (veduta) in the style of Francesco Guardi. Recreate the scene with flickering light, quick, sketchy brushstrokes ('pittura di tocco'), and a lively, atmospheric quality that captures the shimmering beauty of Venice.",
  'Kanō Eitoku': "Transform this photo into a monumental screen painting (byōbu) in the bold style of Kanō Eitoku. Use a dynamic composition, powerful brushstrokes, and a luxurious gold leaf background ('kinpeki-ga'). Figures and nature should be oversized and full of energy, reflecting the grandeur of the Momoyama period.",
  'Hasegawa Tōhaku': "Transform this photo into a painting in the versatile style of Hasegawa Tōhaku. Recreate either a grand, gorgeous screen with a gold background, or a subtle monochrome ink painting. Focus on conveying atmospheric depth, emotional resonance, and a deep sense of tranquility, as in his famous 'Pine Trees' screens.",

  // 17th Century
  'Rembrandt van Rijn': "Transform this photo into a detailed oil painting in the style of Rembrandt. Emphasize dramatic, high-contrast lighting (chiaroscuro), deep, rich earth tones, visible, expressive brushwork, and profound psychological insight.",
  'Diego Velázquez': "Transform this photo into a Spanish Golden Age portrait in the style of Diego Velázquez. Focus on realism, masterful brushwork that is loose up close but precise from afar, a restrained yet rich color palette, and capturing the dignity and truth of the subject.",
  'Peter Paul Rubens': "Transform this photo into a Flemish Baroque masterpiece in the style of Peter Paul Rubens. Emphasize dynamic compositions, vibrant colors, fleshy, full-bodied figures, and a sense of energy, movement, and sensuality.",
  'Jusepe de Ribera': "Transform this photo into a Spanish Baroque painting in the style of Jusepe de Ribera. Combine the dramatic tenebrism of Caravaggio with intense realism, often depicting saints or mythological figures with profound dignity and psychological depth.",
  'Johannes Vermeer': "Transform this photo into a detailed oil painting in the style of Johannes Vermeer. Focus on serene, soft, and clear light, often coming from a window on the left. Use a masterful, precise application of paint, a balanced composition, and a calm, domestic atmosphere.",
  'Nicolas Poussin': "Transform this photo into a French Classicism painting in the style of Nicolas Poussin. Emphasize clarity, logic, and order. Use strong, statuesque figures arranged in a harmonious composition based on classical themes, with a controlled color palette.",
  'Georges de La Tour': "Transform this photo into a French Baroque painting in the style of Georges de La Tour. Focus on a nocturnal scene illuminated by a single candle, creating simplified, geometric forms and a contemplative, spiritual atmosphere through dramatic chiaroscuro.",
  'Artemisia Gentileschi': "Transform this photo into a powerful Italian Baroque painting in the style of Artemisia Gentileschi. Recreate the dramatic power and psychological intensity of her work, using strong tenebrism to focus on heroic female figures and emotionally charged narrative scenes.",
  'Jacob Jordaens': "Transform this photo into a Flemish Baroque painting in the style of Jacob Jordaens. Focus on lively, boisterous scenes of peasant life or mythology. Use warm colors, energetic compositions, and robust, realistic figures.",
  'Tawaraya Sōtatsu': "Transform this photo into a work in the Rinpa school style of Tawaraya Sōtatsu. Emphasize bold, decorative patterns, simplified forms, and vibrant colors against a gold leaf background. Use the 'tarashikomi' technique, where ink or paint is applied onto a still-wet layer, creating blurred, pooling effects.",
  'Hishikawa Moronobu': "Transform this photo into an early ukiyo-e woodblock print in the style of Hishikawa Moronobu. Recreate a scene from the 'floating world' of Edo. Use strong, flowing black outlines and simple, flat areas of color. The composition should be narrative in character and convey the energy of city life.",

  // 18th Century
  'Jean-Antoine Watteau': "Transform this photo into a 'fête galante' scene in the Rococo style of Jean-Antoine Watteau. Emphasize elegant figures in idyllic park settings, using a delicate, feathery brushwork and a soft, shimmering color palette to evoke a mood of wistful charm.",
  'Jean-Baptiste-Siméon Chardin': "Transform this photo into a quiet, intimate still life or genre scene in the style of Jean-Baptiste-Siméon Chardin. Emphasize a thick, textured application of paint, a subtle harmony of colors, and a sense of order, simplicity, and dignity in everyday life.",
  'Canaletto': "Transform this photo into a detailed, sunlit view of Venice in the style of Canaletto. Emphasize topographical accuracy, precise architectural details, clear light, and a sense of grandeur and atmosphere.",
  'Jean-Étienne Liotard': "Transform this photo into a portrait in the style of Jean-Étienne Liotard, with a high degree of realism and charm. Focus on precise detail, clear light, and capturing the personality of the sitter without idealization, often with a pastel-like quality.",
  'François Boucher': "Transform this photo into a Rococo painting in the style of François Boucher. Emphasize charming, playful mythological or pastoral scenes, using a light, delicate color palette of blues and pinks, with soft forms and a sense of sensual, lighthearted elegance.",
  'Joshua Reynolds': "Transform this photo into a 'Grand Manner' portrait in the style of Joshua Reynolds. Emphasize rich colors, dramatic lighting, and allusions to classical art to capture the noble character and social standing of the subject.",
  'Thomas Gainsborough': "Transform this photo into a portrait in the style of Thomas Gainsborough. Emphasize light, feathery brushwork and a natural, relaxed sensibility, often placing the figure in a delicate, rustic landscape with cool, silvery tones.",
  'Giovanni Battista Tiepolo': "Transform this photo into a large-scale, light-filled decorative scene in the style of Giovanni Battista Tiepolo. Emphasize airy compositions, a pale, luminous color palette, and dynamic figures that seem to float effortlessly.",
  'Marie-Anne Coustou': "Transform this photo into an elegant portrait in the French Rococo style. Focus on a delicate portrayal of the face, fine details in clothing, and a soft, pleasing color palette to capture the grace of the era.",
  'Sébastien Constant': "Transform this photo into a portrait in the late French Baroque or early Rococo style. Focus on a dignified yet sensitive portrayal of the subject, with attention to the texture of fabrics and a clear, balanced composition.",
  'Suzuki Harunobu': "Transform this photo into a full-color 'nishiki-e' print in the style of Suzuki Harunobu. Emphasize delicate, graceful figures with an almost doll-like innocence. Use a subtle and exquisite color palette and create a poetic, dreamlike atmosphere.",
  'Kitagawa Utamaro': "Transform this photo into a 'bijinga' (pictures of beautiful women) ukiyo-e print in the style of Kitagawa Utamaro. Focus on idealized, elegant beauty, using graceful lines and a refined composition. Often use the 'ōkubi-e' (large head) format to capture subtle facial expressions and character.",
  
  // 19th Century
  'Viktor Vasnetsov': "Transform this photo into a painting in the style of Victor Vasnetsov. Recreate a scene from Russian folklore or history, emphasizing a romantic, epic mood, realistic details combined with decorative patterns, and a powerful sense of national identity.",
  'Vasily Surikov': "Transform this photo into a large-scale historical scene in the style of Vasily Surikov. Emphasize psychological depth in a crowd of figures, complex compositions, and a powerful sense of historical authenticity and drama from Russian history.",
  'Ivan Aivazovsky': "Transform this photo into a dramatic seascape in the style of Ivan Aivazovsky. Focus on the sublime power of the sea and the luminous quality of light on water, clouds, and mist to create a romantic and powerful image.",
  'Isaac Levitan': "Transform this photo into a 'mood landscape' in the style of Isaac Levitan. Focus on capturing a subtle, profound emotion through nature, using a nuanced, often melancholic color palette, soft atmospheric light, and the quiet beauty of the Russian landscape.",
  'Orest Kiprensky': "Transform this photo into a Romantic portrait in the style of Orest Kiprensky. Combine Neoclassical structure with Romantic sensibility, emphasizing the individual personality and inner life of the subject through dramatic lighting and expressive brushwork.",
  'Édouard Manet': "Transform this photo into a painting in the style of Édouard Manet. Emphasize bold, flat areas of color, visible brushwork, strong contrasts, and a direct, modern subject matter that challenges traditional composition.",
  'Paul Cézanne': "Transform this photo into a Post-Impressionist work in the style of Paul Cézanne. Reduce forms to their geometric essentials (cylinders, spheres, cones), emphasizing structure and solidity with constructive, parallel brushstrokes and a modulated color palette.",
  'Claude Monet': "Transform this photo into an Impressionist painting in the style of Claude Monet. Focus on capturing the fleeting effects of light and atmosphere, using short, broken brushstrokes and a bright, vibrant color palette to depict the overall impression of a scene.",
  'Edgar Degas': "Transform this photo into a work in the style of Edgar Degas. Recreate a scene from modern life (like dancers or horse races) with unusual viewpoints, cropped compositions inspired by photography, and a mastery of drawing and capturing movement.",
  'Gustave Courbet': "Transform this photo into a Realist painting in the style of Gustave Courbet. Focus on tangible, unidealized reality, using a palette of rich, earthy tones and a thick application of paint to depict a scene from everyday life with honesty and directness.",
  'Katsushika Hokusai': "Transform this photo into a dynamic ukiyo-e woodblock print in the style of Katsushika Hokusai. Emphasize dramatic compositions, bold colors (especially Prussian blue), and a powerful sense of nature's movement and energy, as in his 'The Great Wave'.",
  'Utagawa Hiroshige': "Transform this photo into a lyrical ukiyo-e landscape in the style of Utagawa Hiroshige. Focus on capturing atmospheric effects like rain, snow, and mist. Use subtle color gradations ('bokashi') and a quiet, poetic mood to convey the beauty of Japanese landscapes and travel scenes.",

  // 20th Century
  'Pablo Picasso': "Transform this photo into a Cubist painting in the style of Pablo Picasso. Deconstruct the subject into geometric planes and abstract forms, showing multiple viewpoints simultaneously. Use a muted palette for Analytical Cubism or bright, bold colors for Synthetic Cubism.",
  'Wassily Kandinsky': "Transform this photo into an early abstract painting in the style of Wassily Kandinsky. Deconstruct the subject into a dynamic composition of vibrant, non-naturalistic colors, bold lines, and abstract shapes to convey emotion and a sense of musical rhythm.",
  'Frida Kahlo': "Transform this photo into a symbolic self-portrait in the style of Frida Kahlo. Emphasize bold, vibrant colors inspired by Mexican folk art, a mixture of realism and fantasy, and a direct, unflinching emotional intensity.",
  'Marc Chagall': "Transform this photo into a dreamlike painting in the style of Marc Chagall. Emphasize floating figures, vibrant, non-realistic colors, and symbolic elements drawn from folklore and personal memory to create a poetic and whimsical scene.",
  'Salvador Dalí': "Transform this photo into a Surrealist masterpiece in the style of Salvador Dalí. Create a bizarre, dreamlike landscape, emphasizing hyper-realistic detail on irrational subjects, melting forms, and a vast, empty space to create a sense of wonder.",
  'Andy Warhol': "Transform this photo into a vibrant Pop Art piece in the style of Andy Warhol. Emphasize a silkscreen print effect with bold, flat areas of high-contrast, non-realistic color to create a graphic, commercial feel.",
  'Jackson Pollock': "Transform this photo into a dynamic 'drip' painting in the style of Jackson Pollock. Focus on layers of rhythmic, gestural lines of dripped and poured paint, conveying a sense of energy, chaos, and subconscious creation.",
  'Paul Klee': "Transform this photo into a work in the style of Paul Klee. Emphasize a childlike simplicity, a focus on line and color, and a symbolic, graphic language with a sense of humor and musicality.",
  'Kazimir Malevich': "Transform this photo into a Suprematist composition in the style of Kazimir Malevich. Deconstruct the subject into basic geometric shapes like squares and rectangles, using a limited color palette on a plain background to focus on pure artistic feeling.",
  'Roy Lichtenstein': "Transform this photo into a Pop Art piece in the style of Roy Lichtenstein. Recreate the image as a comic book panel, emphasizing bold black outlines, primary colors, and the use of Ben-Day dots for shading and texture.",
  'Yokoyama Taikan': "Transform this photo into a Nihonga-style painting by Yokoyama Taikan. Use the 'mōrōtai' (vague style) technique, omitting clear outlines and applying soft color gradations to create an atmospheric, dreamlike, or misty effect. The subject should convey a sense of grand, spiritualized nature.",
  'Yayoi Kusama': "Transform this photo into an avant-garde work in the style of Yayoi Kusama. Cover the entire surface with repeating patterns, especially polka dots ('Infinity Nets'). Use bright, high-contrast colors to create an obsessive, hallucinatory effect that explores themes of infinity, obsession, and self-obliteration."
};

export const artistsByCentury: Record<string, Artist[]> = {
    "15th Century": [
      'Andrei Rublev', 'Theophanes the Greek', 'Gentile da Fabriano', 'Cennino Cennini', 'Melchior Broederlam', 
      'Leonardo da Vinci', 'Albrecht Dürer', 'Sandro Botticelli', 'Raphael Sanzio', 'Fra Filippo Lippi',
      'Sesshū Tōyō', 'Kanō Masanobu'
    ],
    "16th Century": [
      'Leonardo da Vinci', 'Michelangelo Buonarroti', 'Raphael Sanzio', 'Titian', 'Caravaggio',
      'Giovanni Bellini', 'Pieter Bruegel the Elder', 'El Greco', 'Albrecht Altdorfer', 'Francesco Guardi',
      'Kanō Eitoku', 'Hasegawa Tōhaku'
    ],
    "17th Century": [
      'Caravaggio', 'Rembrandt van Rijn', 'Diego Velázquez', 'Peter Paul Rubens', 'Jusepe de Ribera',
      'Johannes Vermeer', 'Nicolas Poussin', 'Georges de La Tour', 'Artemisia Gentileschi', 'Jacob Jordaens',
      'Tawaraya Sōtatsu', 'Hishikawa Moronobu'
    ],
    "18th Century": [
      'Jean-Antoine Watteau', 'Jean-Baptiste-Siméon Chardin', 'Canaletto', 'Jean-Étienne Liotard', 'François Boucher',
      'Joshua Reynolds', 'Thomas Gainsborough', 'Giovanni Battista Tiepolo', 'Marie-Anne Coustou', 'Sébastien Constant',
      'Suzuki Harunobu', 'Kitagawa Utamaro'
    ],
    "19th Century": [
      'Viktor Vasnetsov', 'Vasily Surikov', 'Ivan Aivazovsky', 'Isaac Levitan', 'Orest Kiprensky',
      'Édouard Manet', 'Paul Cézanne', 'Claude Monet', 'Edgar Degas', 'Gustave Courbet',
      'Katsushika Hokusai', 'Utagawa Hiroshige'
    ],
    "20th Century": [
      'Pablo Picasso', 'Wassily Kandinsky', 'Frida Kahlo', 'Marc Chagall', 'Salvador Dalí',
      'Andy Warhol', 'Jackson Pollock', 'Paul Klee', 'Kazimir Malevich', 'Roy Lichtenstein',
      'Yokoyama Taikan', 'Yayoi Kusama'
    ],
};
