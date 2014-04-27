function Reference (id, href, type, tags, slug) {
  this.id = id;
  this.href = href;
  this.type = type;
  this.tags = tags;
  this.slug = slug;
}

var fromDoc = function (doc) {
  return new Reference(doc.id, doc.href, doc.type, doc.tags, doc.slug);
};

module.exports = {
  fromDoc: fromDoc
};
