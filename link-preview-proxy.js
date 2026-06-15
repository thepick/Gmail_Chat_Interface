// Google Apps Script — Link Preview Proxy
// Deploy as a web app: Publish → Deploy as web app → "Anyone can access"
// Copy the deployment URL and paste it into the Gmail Chat settings panel.

function doGet(e) {
  var url = e.parameter.url;
  if (!url) return jsonResponse({ error: 'Missing url parameter' }, 400);
  
  // Basic URL validation
  if (!/^https?:\/\/.+/i.test(url)) return jsonResponse({ error: 'Invalid URL' }, 400);
  
  try {
    var response = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      followRedirects: true,
      validateHttpsCertificates: true
    });
    
    var html = response.getContentText();
    var result = extractMetadata(html, url);
    return jsonResponse(result);
  } catch(e) {
    return jsonResponse({ error: e.toString() }, 500);
  }
}

function extractMetadata(html, url) {
  var result = {};
  
  // Title: og:title > twitter:title > <title>
  result.title = extractMeta(html, 'og:title') 
    || extractMeta(html, 'twitter:title') 
    || extractTag(html, 'title')
    || '';
  result.title = cleanText(result.title);
  
  // Description: og:description > twitter:description > meta description
  result.description = extractMeta(html, 'og:description') 
    || extractMeta(html, 'twitter:description') 
    || extractMetaAttr(html, 'name', 'description')
    || '';
  result.description = cleanText(result.description);
  
  // Image: og:image > twitter:image
  result.image = extractMeta(html, 'og:image') 
    || extractMeta(html, 'twitter:image') 
    || '';
  
  return result;
}

function extractMeta(html, property) {
  var re = new RegExp('<meta[^>]+property=["\']' + escapeRegExp(property) + '["\'][^>]+content=["\']([^"\']+)["\']', 'i');
  var match = html.match(re);
  if (match) return match[1];
  
  // Also try name attribute
  var re2 = new RegExp('<meta[^>]+name=["\']' + escapeRegExp(property) + '["\'][^>]+content=["\']([^"\']+)["\']', 'i');
  var match2 = html.match(re2);
  return match2 ? match2[1] : '';
}

function extractMetaAttr(html, attr, value) {
  var re = new RegExp('<meta[^>]+' + attr + '=["\']' + escapeRegExp(value) + '["\'][^>]+content=["\']([^"\']+)["\']', 'i');
  var match = html.match(re);
  return match ? match[1] : '';
}

function extractTag(html, tag) {
  var re = new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)</' + tag + '>', 'i');
  var match = html.match(re);
  return match ? match[1] : '';
}

function cleanText(text) {
  return String(text)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 500); // Cap at 500 chars
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function jsonResponse(data, code) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  if (code) output = output.setMimeType(ContentService.MimeType.JSON);
  else output = output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
